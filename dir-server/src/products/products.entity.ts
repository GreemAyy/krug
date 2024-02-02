import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('images')
export class ImageEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id:number
    @Column({type:"varchar",length:1000})
    name:string
}

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn({type:'int'})
    id:number
    @Column({type:"varchar",length:500})
    name:string
    @Column({type:"text"})
    description:string
    @Column({type:"json"})
    images_id:number[]
    @Column({type:"json"})
    info:Info[]
    @Column({type:"varchar",length:50})
    category:string
    @Column({type:"int",default:0})
    sale_percent:number
}
type Info={
    price:number,
    weight:number,
    quantity:number,
    measure:'g'|'l'|'p'|string,
    size:'s'|'m'|'l'|'o'|number
}