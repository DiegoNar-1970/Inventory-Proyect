import z from 'zod'

const loginSchema=z.object({
    name:z.string({
        invalid_type_error:'name just be a string',
        required_error: 'name is required.'
    }).min(4).max(15),
    userName:z.string({
        invalid_type_error:'username just be a string',
        required_error: 'userName is required.'}),
    password:z.string({
            invalid_type_error:'password just be a string',
            required_error: 'password is required.'}).min(4).max(20)
})
export function validateLogin (input) {
    return loginSchema.safeParse(input)
  }
  
  export function validatePartialLogin (input) {
    return loginSchema.partial().safeParse(input)
  }
  