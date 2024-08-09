import z from 'zod';


const profileSchema = z.object({
  cc: z.number({
    invalid_type_error: 'La identificación debe ser un número',
    required_error: 'El campo identificación es obligatorio',
  }).min(1, 'La identificación debe ser un número válido').max(99999999999, 'La identificación es demasiado larga'),
  
  name: z.string({
    invalid_type_error: 'El nombre debe ser una cadena de texto',
    required_error: 'El campo nombre es obligatorio',
  }).regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El nombre solo puede contener letras'),

  lastName: z.string({
    invalid_type_error: 'El apellido debe ser una cadena de texto',
    required_error: 'El campo apellido es obligatorio',
  }).regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El apellido solo puede contener letras'),

  birthdate: z.string({
    invalid_type_error: 'La fecha de nacimiento debe ser una cadena de texto',
    required_error: 'El campo fecha de nacimiento es obligatorio',
  }),

  sex: z.string({
    invalid_type_error: 'El sexo debe ser una cadena de texto',
    required_error: 'El campo sexo es obligatorio',
  }).regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El sexo solo puede contener letras'),

  phone: z.number({
    invalid_type_error: 'El teléfono debe ser un número',
    required_error: 'El campo teléfono es obligatorio',
  }).min(1, 'El teléfono debe ser un número válido').max(99999999999, 'El teléfono es demasiado largo'),

  email: z.string({
    invalid_type_error: 'El correo electrónico debe ser una cadena de texto',
    required_error: 'El campo correo electrónico es obligatorio',
  }).email('El correo electrónico debe ser válido'),
    
  eps: z.string({
    invalid_type_error: 'El EPS debe ser una cadena de texto',
    required_error: 'El campo EPS es obligatorio',
  }).regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El EPS solo puede contener letras')
});
export function validateProfile (input) {
  return profileSchema.safeParse(input)
}

export function validatePartialProfile (input) {
  return profileSchema.partial().safeParse(input)
}
