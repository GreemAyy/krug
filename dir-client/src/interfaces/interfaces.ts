import { Add } from "@/tools/list"

export interface ICart{
    product:IProduct
    extras:Add[]|null
    size:string
    quantity:number
}

export interface IProduct{
    id?:number,
    name:string,
    description:string,
    images_id:number[],
    info:Info[]
    category:string,
    sale_percent:number,
}

export type Info ={
    price:number,
    weight:number,
    quantity:number,
    measure:string|('g'|'l'|'p'),
    size:('s'|'m'|'l'|'o')|number
}

export interface ICity{
    id:number,
    region:string,
    name:string
}

export interface IPlace{
    id:number,
    city_id:number,
    street:string,
    building:string
}

export interface IOrder{
    id?:number
    user_id:number
    place_id:number
    products:ICart[]
    total_price:number
    status:number,
    date_of_create:string
}