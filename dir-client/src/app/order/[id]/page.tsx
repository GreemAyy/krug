'use client'
import { primary_color } from '@/const'
import { getSingleOrder } from '@/http/order.http'
import { useUserStore } from '@/store'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import style from '@/styles/order.module.scss'

export default ()=>{
    const [isLoading,setIsLoading] = useState(true) 
    const orderId = +(useParams()['id']||0);
    const {id,hash} = useUserStore(s=>s)

    useEffect(()=>{
        getSingleOrder(orderId)
        .then(data=>{
            if(!data) window.location.pathname='/'
        })
    },[])

    if(isLoading)
    return  <div className={style['loading']}>
                <MoonLoader color={primary_color}/>
            </div>
    return  <div className={style['block']}>

            </div>
}