import z from 'zod'

const newsSchema=z.object({
    employee: z.string({
        invalid_type_error: 'employee just be a string',
        required_error: 'employee is required.'}).optional(),

    week: z.number({invalid_type_error: 'tipo de dato incorrecto'})
        .min(1).max(60),
    extraHours:z.object({
        type : z.string(),
        hours : z.number().min(0).max(24),
        minutes:z.number().max(61),
        percentage:z.number()
    }),
    comissions:z.object({
        type:z.string(),
        apply:z.boolean(),
        value:z.number()
    })
})
export function validateNewsSchema(input) {
    return newsSchema.safeParse(input)
  }
  
  export function validatePartiaNewsSchema (input) {
    return newsSchema.partial().safeParse(input)
  }
  