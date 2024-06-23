import z from 'zod'

const employeeSchema = z.object({
    position: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  area: z.string().default('none'),
  shift: z.string().default('none'),
  profile: z.object()
})

export function validateEmployeeSchema(input) {
  return employeeSchema.safeParse(input)
}

export function validateEmployeeSchema (input) {
  return employeeSchema.partial().safeParse(input)
}
