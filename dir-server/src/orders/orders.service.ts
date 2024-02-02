import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './orders.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository:Repository<OrderEntity>
    ){}

    async createOrder(order:OrderDto){
        const create = await this.orderRepository.insert(order)
        const createId:number|void = create.raw?.insertId
        return createId
    }
    async getSingleOrder(id:number){
        return await this.orderRepository.findBy({id})
    }
    async getUserOrder(id:number){
        return await this.orderRepository.findBy({user_id:id})
    }
}
