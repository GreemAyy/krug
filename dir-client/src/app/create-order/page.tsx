'use client'
import { _URL, primary_color } from '@/const'
import { ICart } from '@/interfaces/interfaces'
import { useUserStore } from '@/store'
import style from '@/styles/create-order.module.scss'
import { useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'

export default ()=>{
    const {id} = useUserStore(s=>s)
    const [products,setProducts] = useState<ICart[]>([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        const cart:ICart[] = JSON.parse((localStorage.getItem('cart'))||'[]')
        if(!id||!cart.length)
            window.location.pathname='/'
        else{
            setProducts(cart)
            setIsLoading(false)
        }
    },[])

    if(isLoading)
        return  <div className={style["loading"]}>
                    <MoonLoader color={primary_color}/>
                </div>
    return  <div className={style["main"]}>
                <div className={style["header"]}>
                    Оформление заказа
                </div>
                <div className={style["products-list"]}>
                    {
                    products.map(product=> 
                    <CartItem product={product}/>)
                    }
                </div>
            </div>
}

const CartItem=({product}:{product:ICart})=>
    <div key={product.product.id} className={style["product-item"]}>
        <img src={`${_URL}/api/products/image/${product.product.images_id[0]}`} 
        alt={product.product.name}
        className={style["product-item-image"]} />
        <div>
            <div className={style["product-item-name"]}>
                {product.product.name}
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