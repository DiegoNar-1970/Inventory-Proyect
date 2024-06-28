import z from 'zod'

const newsSchema=z.object({
    employee: z.string({
        invalid_type_error: 'employee just be a string',
        required_error: 'employee is required.'}).optional(),

        week: z.array(z.number({
            invalid_type_error: 'week must be a number'
        })).nonempty({
            message: 'week array cannot be empty'
        }),
  
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
  