'use client'
import { _URL, primary_color, primary_color_hex } from '@/const'
import { ICart, IOrder, IPlace } from '@/interfaces/interfaces'
import { useUserStore } from '@/store'
import style from '@/styles/create-order.module.scss'
import { useEffect, useMemo, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getPlacesByCityId } from '@/http/places.http'
import { createNewOrder } from '@/http/order.http'

export default ()=>{
    const {id} = useUserStore(s=>s)
    const [products,setProducts] = useState<ICart[]>([])
    const [isLoading,setIsLoading] = useState(true)
    const [isClient,setIsClient] = useState(false)
    const [cityId,setCityId] = useState(0)
    const [pickedPlace,setPickedPlace] = useState<IPlace|null>(null)

    useEffect(()=>{
        const cart:ICart[] = JSON.parse((localStorage.getItem('cart'))||'[]')
        const city = JSON.parse((localStorage.getItem('city'))||"{}")
        if(!id||!cart.length||!(city?.['id']))
            window.location.pathname='/'
        else{
            setProducts(cart)
            setIsLoading(false)
            setCityId(+(city?.['id']||0))
            setIsClient(true)
        }
    },[])

    const calcPrice = useMemo(()=>
    products.reduce((a,i)=>a+=i.product.info
    .filter(f=>f.size==i.size)[0].price+
    (i.extras
        ?.reduce((_a,_i)=>_a+=_i.price,0)||0),0)
        ,[isClient])

    const createOrder=()=>{
        const create:IOrder = {
            user_id: id||0,
            place_id: pickedPlace?.id||0,
            products: products,
            total_price: calcPrice,
            status: 0,
            date_of_create:''
        }
        setIsLoading(true)

        createNewOrder(create)
        .then(data=>{
            if(data.id){
                localStorage.removeItem('cart');
                window.location.pathname = `/order/${data.id}`;
            }
            else
                setIsLoading(false)
        })
    }

    if(isLoading)
        return  <div className={style["loading"]}>
                    <MoonLoader color={primary_color}/>
                </div>
    return  <div className={style["main"]}>
                <div className={style["header"]}>
                    Оформление заказа
                </div>
                {isClient&&
                <PlacesSelect cityId={cityId} 
                onSelect={place=>setPickedPlace(place)}/>}
                <div className={style["products-list"]}>
                {
                    products.map(product=> 
                    <CartItem product={product}/>)
                }
                </div>
                <Button  
                onClick={createOrder}
                style={{
                    pointerEvents:pickedPlace?"auto":"none",
                    opacity:pickedPlace?1:.5}}
                className={style['btn-submit']}>
                    Оформить заказ за {calcPrice}₽
                </Button>
            </div>
}

type PlacesSelectProps={cityId:number,onSelect:(p:IPlace)=>void}
const PlacesSelect=({cityId,onSelect}:PlacesSelectProps)=>{
    const [places,setPlaces] = useState<IPlace[]>([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        getPlacesByCityId(cityId)
        .then(data=>{
            if(data.length){
                setPlaces(data)
                setIsLoading(false)
            }else 
                window.location.pathname='/'
        })
    },[])

    if(isLoading)
        return <MoonLoader color={primary_color}/>
    return  <div className={style['select']}>
                <div className={style["select-header"]}>
                    Выбор ресторана
                </div>
                <Select 
                onValueChange={e=>onSelect(places.filter(f=>f.id==+e)?.[0])}>
                    <SelectTrigger
                    className={style['select-trigger']}>
                        <SelectValue placeholder="Выберите ресторан" />
                    </SelectTrigger>
                    <SelectContent>
                    {
                    places.map(place=>
                        <SelectItem 
                        className={style['select-item']}
                        value={place.id.toString()}>
                            {place.street} Д. {place.building}
                        </SelectItem>)    
                    }
                    </SelectContent>
                </Select>
            </div>
}

const CartItem=({product}:{product:ICart})=>
    <div key={product.product.id} className={style["product-item"]}>
        <img src={`${_URL}/api/products/image/${product.product.images_id[0]}`} 
        alt={product.product.name}
        className={style["product-item-image"]} />
        <div>
            <div className={style["product-item-name"]}>
                {product.product.name} - {product.quantity} шт.
            </div>
            <ul className={style["extras-list"]}>
                {
                product.extras?.map(extra=>
                  <li>
                      {extra.name}
                  </li>)
                }
            </ul>
        </div>
    </div>