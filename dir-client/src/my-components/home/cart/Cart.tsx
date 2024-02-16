import {cartPriceStore, useCartStore, useCityModal, useHideScroll, useUserStore} from "@/store"
import style from '@/styles/home/cart.module.scss'
import { updateLS } from "@/tools/list"
import { useEffect, useRef, useState } from "react"
import CartItem from "./CartItem"
import { useRouter } from "next/navigation"
import {ICart} from "@/interfaces/interfaces";

export default ()=>{
    const isOpened = useCartStore(s=>s.isOpened)
    const setIsOpened = useCartStore(s=>s.setIsOpened)
    const list = useCartStore(s=> s.list)
    const setList = useCartStore(s=>s.setList)
    const [showBG,setShowBG]=useState(false)
    const [showBlock,setShowBlock]=useState(false)
    const [totalPrice, setTotalPrice] = useState(0);
    const ref = useRef<HTMLDivElement>(null)
    const setHideScroll = useHideScroll(s=>s.setHide)
    const id = useUserStore(s=>s.id)
    const {setOpen} = useCityModal(s=>s)
    const router = useRouter()

    useEffect(()=>{
        parseAndUpdate()
        if(isOpened)
            setTimeout(()=>setHideScroll(true),100)
        cartPriceStore.watch('price',() => parseAndUpdate())
    },[])

    useEffect(()=>{
        setShowBG(isOpened)
        setTimeout(()=>setShowBlock(isOpened),isOpened?50:250)
        setHideScroll(isOpened)
    },[isOpened])

    const parseAndUpdate = ()=>{
        const cart = localStorage.getItem('cart')
        let parsedList = JSON.parse(cart||'[]');
        if(parsedList.includes(null))
            parsedList = []
        setList(parsedList)
        setTotalPrice(calcPrice(parsedList));
    }

    const changeQuantity=(i:number, type:'inc'|'dec')=>{
        const newList = list.map((item,index)=>{
            if(i==index&&item.quantity) 
                if(type=='inc')
                    item.quantity+=1
                else 
                    item.quantity-=1
            return item
        }).filter(i=>i.quantity>0)
        setList(newList)
        updateLS(newList)
        setTotalPrice(calcPrice(newList))
    }

    const del=(i:number)=>{
        const newList = list.filter((item,idx)=>i!=idx)
        setList(newList)
        updateLS(newList)
        cartPriceStore.update('price')
    }

    const calcPrice=(list: ICart[])=>{
        let totalPrice = 0
        for(let item of list){
            const price = item.product.info.filter(i=>i.size==item.size)[0].price
            const extras = (item.extras?.reduce((a,i)=>a+i.price,0)||0)*item.quantity
            totalPrice+=(price*item.quantity)+extras
        }
        return totalPrice
    }

    const createNewOrder=async()=>{
        const city = JSON.parse((localStorage.getItem('city'))||'{}')
        if(city?.['id']){
            setHideScroll(false)
            router.push(!id?'/auth':'/create-order')
        }else
            setOpen(true)
    }

    return (<div style={{display:showBG?'block':'none'}} className={style['cart']}>
                <div onClick={()=>setIsOpened(false)} className={style['cart-bg']}/>
                <div
                style={{right:showBlock?0:'-100%'}}
                ref={ref}
                className={style["cart-block"]}>
                    {
                        !list.length||
                        <div className={style["cart-block-header"]}>
                            <ArrowIcon onClick={()=>setIsOpened(false)}/>
                            <div>
                                Корзина
                            </div>
                        </div>
                    }
                    {
                        list.length ?
                        <>
                        <div className={style["cart-block-list"]}>
                        {
                            list.map((item,i)=>
                                <CartItem
                                key={i}
                                index={i}
                                inc={e=>changeQuantity(e,'inc')}
                                dec={e=>changeQuantity(e,'dec')}
                                del={del}
                                item={item}/>)
                        }
                        </div>
                        <div className={style["outer"]}></div>
                        <div
                        onClick={()=>createNewOrder()}
                        className={style["cart-block-total-price-btn"]}>
                           {id?`Оформить заказ за ${totalPrice}₽`:'Войдите в аккаунт'}
                        </div>
                        </> :
                        <div className={style["cart-is-empty"]}>
                            Корзина пуста. Наполните её
                        </div>
                    }
                </div>
            </div>)
}

const ArrowIcon = ({onClick}:any)=>
<svg 
onClick={()=>onClick()}
width="45px" height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#0F0F0F"></path> </g></svg>