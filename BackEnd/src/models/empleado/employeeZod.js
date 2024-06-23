import z from 'zod'

const employeeSchema = z.object({
    position: z.string({
    invalid_type_error: 'Employee position just be a string',
    required_error: 'Employee position is required.'
  }),
  area: z.string({
                  invalid_type_error: 'Employee area just be a string',
                  required_error: 'Employee area is required.'}).default('none'),
  shift: z.string({
                    invalid_type_error: 'Employee position just be a string',
                    required_error: 'Employee position is required.'}).default('none'),
  profile: z.object({
                    invalid_type_error: 'Employee profile just be a ProfileObject',
                    required_error: 'Employee profile is required.'}).required()
})

export function validateEmployeeSchema(input) {
  return employeeSchema.safeParse(input)
}

export function validateEmployeeSchema (input) {
  return employeeSchema.partial().safeParse(input)
}
