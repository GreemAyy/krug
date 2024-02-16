import { _URL } from "@/const"
import { IOrder } from "@/interfaces/interfaces"
import ky from "ky"

export const getSingleOrder=async(id:number)=>{
    return await ky.get(`${_URL}/api/orders/single/${id}`)
            .json() as IOrder
}

export const createNewOrder = async(order:IOrder)=>{
    return await ky.post(`${_URL}/api/orders/create`,{
        json:order
    }).json() as {id:number|null}
}

export const changeOrderStatus = async (id:number,status:number)=>{
    return await ky.post(`${_URL}/api/orders/change-status`,{
        json:{id,status}
    }).json() as {update:boolean}
}

export const getUserOrders = async (user_id:number)=>{
    return await ky.get(`${_URL}/api/orders/get-user/${user_id}`).json() as IOrder[]
}