import { _URL } from "@/const"
import { IOrder } from "@/interfaces/interfaces"
import ky from "ky"

export const getSingleOrder=async(id:number)=>{
    return await ky.get(`${_URL}/api/orders/single/${id}`)
            .json() as IOrder
}

export const createOrder = async(order:IOrder)=>{
    return await ky.post(`${_URL}/api/orders/create`,{
        json:order
    }).json() as {id:number|null}
}