'use client'
import {_URL, cancel_time_in_minutes, primary_color} from '@/const'
import {changeOrderStatus, getSingleOrder} from '@/http/order.http'
import { useUserStore } from '@/store'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import { IOrder } from '@/interfaces/interfaces'
import {Button} from "@/components/ui/button";
import style from '@/styles/order/order.module.scss'
import moment from "moment";
import {OrderStatus} from "@/interfaces/enums";

export default ()=>{
    const [isLoading,setIsLoading] = useState(true) 
    const orderId = +(useParams()['id']||0);
    const {id} = useUserStore(s=>s)
    const [order,setOrder] = useState<IOrder>()
    const [minutes,setMinutes] = useState(0)
    const [height,setHeight] = useState(0)

    const updateMinutes = (date:string)=>{
        const currentTime = moment()
        const orderTime = moment(date,'YYYY:MM:DD HH:mm')
        const minutesLeft = currentTime.diff(orderTime,'minute')
        setMinutes(cancel_time_in_minutes-minutesLeft)
        if((cancel_time_in_minutes-minutesLeft)<=0){
            changeOrderStatus(orderId,OrderStatus.Canceled)
                .then(({update})=>window.location.reload())
        }
    }

    useEffect(()=>{
        getSingleOrder(orderId)
        .then(data=>{
            if(!data||data?.user_id!==id)
                window.location.pathname='/'
            setOrder(data)
            if(data.status!=OrderStatus.Canceled&&data){
                updateMinutes(data.date_of_create)
                setInterval(()=> updateMinutes(data.date_of_create),10000)
            }
            if(data) setIsLoading(false)
        })
    },[])

    if(isLoading)
    return  <div className={style['loading']}>
                <MoonLoader color={primary_color}/>
            </div>
    return  <div
            className={style['outer']}>
                <div className={style['block']}>
                    <div className={style["header"]}>
                        Заказ №{orderId}
                    </div>
                    <div className={style["products-list"]}>
                        {
                            order?.products?.map(product=>
                                <div className={style['product-item']}>
                                    <img src={`${_URL}/api/products/image/${product.product.images_id[0]}`}
                                         className={style['product-item-img']} alt="" />
                                    <div className={style["product-info"]}>
                                        <div className={style["product-name"]}>
                                            {product.product.name} <span>- {product.quantity} шт.</span>
                                        </div>
                                        <ul className={style["product-extras"]}>
                                            {
                                                product.extras?.map(extra=>
                                                    <li className={style['extra-item']}>
                                                        - {extra.name}
                                                    </li>)
                                            }
                                        </ul>
                                    </div>
                                </div>)
                        }
                    </div>
                    {
                        order?.status == OrderStatus.Canceled||
                        <div className={style['time']}>
                            Осталось времени на оплату : {minutes} минут
                        </div>
                    }
                    {
                        order?.status == OrderStatus.Canceled?
                            <div className={style['cancel-text']}>
                                Заказ отменён
                            </div>:
                            <div className={style['buttons']}>
                                <Button className={style['pay']}>
                                    Оплатить
                                </Button>
                                <Button
                                    onClick={()=>{
                                        changeOrderStatus(orderId,OrderStatus.Canceled)
                                            .then(({update})=>window.location.reload())
                                    }}
                                    className={style['cancel']}>
                                    Отменить
                                </Button>
                            </div>
                    }
                </div>
            </div>
}