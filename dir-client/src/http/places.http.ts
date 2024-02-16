import { _URL } from '@/const'
import type { ICity, IPlace } from '@/interfaces/interfaces'
import ky from 'ky'

export const getCityById=async(id:number)=>{
    return await ky
    .get(`${_URL}/api/places-cities/get-city-by-id/${id}`)
    .json() as ICity[]
}

export const getCitiesLike=async(name:string)=>{
    return await ky
    .get(`${_URL}/api/places-cities/get-cities-like/${name}`)
    .json() as ICity[]
}
export const getPlacesByCityId=async(id:number)=>{
    return await ky
    .get(`${_URL}/api/places-cities/get-places-by-city-id/${id}`)
    .json() as IPlace[]
}

export const getPlaceById=async(id:number)=>{
    return await ky
    .get(`${_URL}/api/places-cities/get-place/${id}`)
    .json() as IPlace[]
}

