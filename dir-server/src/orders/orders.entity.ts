import { ProductEntity } from "src/products/products.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatus{
    Created,
    Canceled,
    Preparing,
    Done
}

@Entity('orders')
export class OrderEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id:number
    @Column({type:'int'})
    user_id:number
    @Column({type:'int'})
    place_id:number
    @Column({type:'json'})
    products:ProductEntity[]
    @Column({type:'int'})
    total_price:number
    @Column({type:'varchar',length:30})
    status:number
    @Column({type:'varchar',length:16})
    date_of_create:string
}