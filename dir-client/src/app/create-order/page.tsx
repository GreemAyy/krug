'use client'
import OrderItem from '@/my-components/create-order/OrderItem'
import { primary_color } from '@/const'
import style from '@/styles/create-order.module.scss'
import { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'

export default ()=>{
    const [cart,setCart] = useState([])
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        setCart(JSON.parse(localStorage.getItem('cart')||'[]'))
        setIsLoading(false)
    },[])
    return  <div className={style['create-order']}>
                <div className={style["create-order-header"]}>
                    Создать заказ
                </div>
                {
                    isLoading?
                    <Loader isLoading={isLoading}/>:
                    cart.length==0?
                    <div className={style["create-order-none"]}>
                        Пусто.
                    </div>:
                    <div className={style["create-order-cart-items"]}>
                        {
                            cart.map(item=><OrderItem item={item}/>)
                        }
                    </div>
                }
            </div>
}

const Loader =({isLoading}:{isLoading:boolean})=><MoonLoader 
cssOverride={{position:'absolute',left:'47.5%'}}
color={primary_color} loading={isLoading}/>