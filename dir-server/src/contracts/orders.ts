import {z} from 'zod'
import { ProductSchema } from './products'

export const OrderSchema=z.object({
    id:z.number().optional(),
    user_id:z.number(),
    place_id:z.number(),
    products:ProductSchema.array(),
    total_price:z.number(),
    status:z.number()
})