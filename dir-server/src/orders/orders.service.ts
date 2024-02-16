import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {OrderEntity, OrderStatus} from './orders.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './orders.dto';
const moment = require('moment')

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository:Repository<OrderEntity>
    ){}

    async createOrder(order:OrderEntity){
        order.date_of_create = moment().format("YYYY:MM:DD HH:mm")
        const create = await this.orderRepository.insert(order as OrderEntity)
        const createId:number|void = create.raw?.['insertId']
        return createId
    }
    async getSingleOrder(id:number){
        return await this.orderRepository.findOneBy({id})
    }
    async getUserOrders(id:number){
        return await this.orderRepository.findBy({user_id:id})
    }
    async updateStatus(id:number,status:number){
        await this.orderRepository.update({id},{status})
        return
    }
    async checkOrdersStatus(){
        const orders = await this.orderRepository.findBy({status:OrderStatus.Created})
        for(let order of orders){
            const currentTime = moment()
            const orderTime = moment(order.date_of_create, "YYYY:MM:DD HH:mm").add(10,'minute')
            if(currentTime.isAfter(orderTime))
                await this.updateStatus(order.id,OrderStatus.Canceled)
        }
    }
}
