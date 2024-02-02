import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private orderService:OrdersService
    ){}

    @Post('/create')
    async createOrder(@Body() order:OrderDto){
        const id = this.orderService.createOrder(order)
        return {id:id??null}
    }
    @Get('/single/:id')
    async getSingle(@Param('id') id:string){
        return await this.orderService.getSingleOrder(+id)
    }
    @Get('/get-user/:id')
    async getUserOrders(@Param('id') id:string){
        return await this.orderService.getUserOrder(+id)
    }
}
