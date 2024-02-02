import {z} from'zod'

export const OrderSchema=z.object({
    id:z.number().optional(),
    user_id:z.number(),
    place_id:z.number(),
    products:z.any().array(),
    total_price:z.number(),
    status:z.string()
})