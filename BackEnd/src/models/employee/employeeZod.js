import z from 'zod';

const employeeSchema = z.object({
  admissionDate:z.date({
      invalid_type_error: 'admissionDate just be a date',}).optional(),

  position: z.string({
      invalid_type_error: 'Employee position just be a string',
      required_error: 'Employee position is required.'}),

  area: z.string({
      invalid_type_error: ' area just be a string',
      required_error: ' area is required.'}),

  shift: z.string({
      invalid_type_error: 'shift just be a string',
      required_error: 'shift is required.'}),

  profile: z.object({
      invalid_type_error: 'profile just be a ProfileSchema'}).optional(),
      parafiscales:z.boolean(),
      baseSalary: z.number().min(100000),
      assistanceTransport:z.number().min(0),
})


export function validateEmployeeSchema(input) {
  return employeeSchema.safeParse(input);
}

export function validatePartialEmployee (input) {
  return employeeSchema.partial().safeParse(input);
}
