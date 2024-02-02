import { createZodDto } from "nestjs-zod";
import { OrderSchema } from "src/contracts/orders";

export class OrderDto extends createZodDto(OrderSchema){}