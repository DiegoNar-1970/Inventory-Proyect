import z from 'zod'

const profileSchema = z.object({
    cc: z.number({
    invalid_type_error: 'identify must be a string',
    required_error: 'identify title is required.'
  }).min(1).max(99999999999),
  name: z.string(),
  lastName: z.string(),
  birthdate: z.string(),
  sex: z.string(),
  phone: z.number().min(1).max(99999999999),
  email: z.string(),
  eps:z.string(),
})

export function validateProfile (input) {
  return profileSchema.safeParse(input)
}

export function validatePartialProfile (input) {
  return profileSchema.partial().safeParse(input)
}
