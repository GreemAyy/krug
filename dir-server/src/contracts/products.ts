import {z} from'zod'

 const InfoSchema = z.object({
    price:z.number(),
    weight:z.number(),
    quantity:z.number(),
    measure:z.string(),
    size:z.string().or(z.number())
})

export const ProductSchema=z.object({
    id : z.number().optional(),
    name : z.string(),
    description : z.string(),
    images_id : z.number().array(),
    info:InfoSchema.array(),
    category : z.string(),
    sale_percent : z.number(),
})

