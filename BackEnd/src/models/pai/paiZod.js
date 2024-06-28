import z from 'zod';

const paiSchema=z.object({
    employee: z.object({
            invalid_type_error: 'Employee just be a object',
            required_error: 'Employee  is required.'
      }).optional(),
      pai: z.number({
            invalid_type_error: 'pai just be a number',
            required_error: 'pai is required.'}).nonnegative().max(999999999),

        date: z.date({
            invalid_type_error: 'date just be a date'}).optional(),

            week: z.array(z.number({
                invalid_type_error: 'week must be a number'
            })).nonempty({
                message: 'week array cannot be empty'
            }),

        news: z.object({
            invalid_type_error: 'news just be a instance of News',})
            .optional()
})
export function validatePaiSchema (input) {
    return paiSchema.safeParse(input)
  }
  
  export function validatePartiaPaiSchema (input) {
    return paiSchema.partial().safeParse(input)
  }
  