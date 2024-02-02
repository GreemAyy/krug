import { _URL } from "@/const"
import { IProduct } from "@/interfaces/interfaces"
import ky from "ky"

export const uploadImageHttp=async(file:File)=>{
    const fd = new FormData()
    fd.append('file',file)
    const create = await ky.post(`${_URL}/api/products/upload-image`, {body:fd}).json()
    if(create)
        return (create as {id:number}).id 
    return null
}

export const createProductHttp=async(product:IProduct)=>{
    const create = await ky.post(`${_URL}/api/products/create`,{json:product})
    if(create.status<300&&create.status>=200)
        return create.json()
    return null
}

export const getAllProductsHttp=async():Promise<IProduct[]|null>=>{
    const get = await ky.get(`${_URL}/api/products/all`)
    if(get.status<300&&get.status>=200)
        return get.json()
    return null
}

export const getSingleProductHttp=async(id:number):Promise<IProduct|null>=>{
    const get = await ky.get(`${_URL}/api/products/single/${id}`)
    if(get.status<300&&get.status>=200)
        return get.json()
    return null
}