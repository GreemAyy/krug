import { createZodDto } from "nestjs-zod"
import { ProductSchema } from "src/contracts/products"

export class ProductDto extends createZodDto(ProductSchema){}