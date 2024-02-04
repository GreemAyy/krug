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
        return {id:id||null}
    }
    @Get('/single/:id')
    async getSingle(@Param('id') id:string){
        return (await this.orderService.getSingleOrder(+id))||null
    }
    @Get('/get-user/:id')
    async getUserOrders(@Param('id') id:string){
        return await this.orderService.getUserOrders(+id)
    }
    @Post('/change-status')
    async updateStatus(@Body() {id,status}:{id:number,status:number}):Promise<{update:boolean}>{
        try{
            await this.orderService.updateStatus(id,status)
            return {update:true}
        }catch(e){
            return {update:false}
        }
    }
}
