import z from 'zod'

const roleZod=z.object({
    role:z.string({
        invalid_type_error: 'role be a string',
        required_error: 'Employee position is required.'}),
    permissions:z.array(
        z.enum(['read','create','update','delete','all','admin']),
        {
            required_error: 'Roles  is required.',
            invalid_type_error: 'Roles must be an array of enum permissions'
        }
    )
})

export function validateRole(input){
    return roleZod.safeParse(input)
}
export function validatePartialRole(input){
    return roleZod.partial().safeParse(input)
}