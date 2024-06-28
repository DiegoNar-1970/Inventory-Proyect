import z from 'zod'

const newsSchema=z.object({
    week: z.number({
        invalid_type_error: 'week just be a number',
        required_error: 'week is required.'}).min(1).max(60).nonnegative(),
  
    date: z.date({
        invalid_type_error: 'date just be a date'}).optional(),
  
    hours: z.number({
        invalid_type_error: 'hours just be a number',
        required_error: 'hours is required.'}).min(0).max(40).nonnegative(),
})
export function validateNewsSchema(input) {
    return newsSchema.safeParse(input)
  }
  
  export function validatePartiaNewsSchema (input) {
    return newsSchema.partial().safeParse(input)
  }
  