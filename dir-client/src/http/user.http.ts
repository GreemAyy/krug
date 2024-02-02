import { _URL } from "@/const"
import ky from "ky"

export const createCodeHttp = async(phone:string)=>{
    const create = await ky.post(`${_URL}/api/users/create-code`,{json:{phone}}).json()
    return create as string  
}

export const createUserHttp=async(phone:string,code:string)=>{
    const create = await ky.post(`${_URL}/api/users/create`,{json:{phone,code}}).json()
    return create as {id:number,hash:string}|null
}

export const getUserHttp=async(id:number)=>{
    const get = await ky.post(`${_URL}/api/users/get`,{json:{id}}).json()
    return get as {id:number,name:string,phone:string,dob:string}
}

export const updateUserHttp = async(body:{hash:string,id:number,name:string,dob:string})=>{
    const update = await ky.post(`${_URL}/api/users/update`,{json:body}).json()
    return update as {update:boolean}
}