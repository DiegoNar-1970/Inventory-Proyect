import z from 'zod'

const profileShema = z.object({
    identificacion: z.number({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  name: z.string().default('none'),
  apellido: z.string().default('none'),
  fechaNacimiento: z.date().default('none'),
  sexo: z.string().default('none'),
  telefono: z.number().min(1).max(999999999).default('none'),
  correo: z.string().default('none'),
  eps:z.string().default('none')
})

export function validateProfile (input) {
  return profileShema.safeParse(input)
}

export function validatePartialProfile (input) {
  return profileShema.partial().safeParse(input)
}
