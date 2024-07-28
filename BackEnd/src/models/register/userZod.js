import z from 'zod'

const UserZod=z.object({
    name:z.string({
        invalid_type_error: 'name must be a string',
        required_error: 'name title is required.'
    }),
    userName : z.string({
        invalid_type_error: 'userName must be a string',
        required_error: 'userName title is required.'
    }),
    password : z.string({
        invalid_type_error: 'password must be a string',
        required_error: 'password title is required.'
    }),
    roles :  z.string({
        invalid_type_error: 'roles have to be',
        required_error: 'roles is required.'
    })
})

export function validateUser (input) {
    return UserZod.safeParse(input)
  }
  
  export function validatePartialUser (input) {
    return UserZod.partial().safeParse(input)
  }