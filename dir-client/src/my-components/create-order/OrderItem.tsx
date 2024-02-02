'use client'
import style from '@/styles/create-order.module.scss'
import type { ICart } from "@/interfaces/interfaces"
import { _URL } from '@/const'

type Input = {item:ICart}
export default ({item}:Input)=>{
    return  <div className={style['create-order-cart-item']}>
                <img 
                src={`${_URL}/api/products/image/${item.product.images_id[0]}`}
                className={style["create-order-cart-item-img"]}/>
                <div className={style["create-order-middle-block"]}>
                    <div className={style["create-order-cart-name"]}>
                        {item.product.name}
                    </div>
                </div>
            </div>
}