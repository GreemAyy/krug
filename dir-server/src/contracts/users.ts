import {z} from'zod'

export const UserSchema=z.object({
    id:z.number().optional(),
    name:z.string(),
    phone:z.string(),
    dob:z.string()
})