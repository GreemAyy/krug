import {cartPriceStore, useCartStore, useHideScroll, useModalStore} from '@/store'
import style from '@/styles/home/modal-mobile.module.scss'
import { useEffect, useRef, useState } from 'react'
import { _URL, categories, primary_color } from '@/const'
import { useRouter } from 'next/navigation'
import { ICart, IProduct, Info } from '@/interfaces/interfaces'
import { addItemToCart, addList, prefix, updateLS } from '@/tools/list'

export default ()=>{
    const isOpened=useModalStore(s=>s.isOpened)
    const setIsOpened = useModalStore(s=>s.setIsOpened)
    const product = useModalStore(s=>s.product)
    const setProduct = useModalStore(s=>s.setProduct)
    const router = useRouter()
    const [active,setActive]=useState(0)
    const [op,setOp]=useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const list = useCartStore(s=>s.list) 
    const [indexes,setIndexes]=useState<number[]>([])
    const setHide = useHideScroll(s=>s.setHide)

    useEffect(()=>{
        if(isOpened) {
            setOp(true)
            document.title=categories[product?.category||'pizza']+' '+product?.name||'Null'
            setHide(true)
        }
    },[isOpened])
    const close=()=>{
        router.replace('/',{scroll:false})
        setOp(false)
        setIndexes([])
        document.title='Круг. Доставка'
        setTimeout(()=>setIsOpened(false),200)
        setProduct(null)
        setActive(0)
        setHide(false)
    }

    const converter=(info:Info)=>{
        const SIZES:{[k:string]:string} = 
                    {'s':'Маленькая',
                    'm':'Средняя',
                    'l':'Большая',
                    'o':info.quantity==1?'Один размер':`${info.quantity} шт.`}
        return SIZES[info.size]
    }

    const addToCart=()=>{
        const toAdd = {
            product,
            extras:addList.filter((_,i)=>indexes.includes(i)),
            size:product?.info[active].size as string,
            quantity:1
        } as ICart
        const added = addItemToCart(toAdd,list)
        updateLS(added)
        cartPriceStore.update('price')
        close()
    }

    if(!product) return ''
    return  <div style={{display:isOpened?'block':'none'}}
                className={style['product-modal']}>
                <div onClick={()=>close()} style={{opacity:+op}} className={style["modal-bg"]}/>
                <div style={{opacity:+op}} 
                className={style["product-modal-full"]}>
                <div ref={ref} className={style["product-modal-block"]}>
                    <div onClick={close}
                    className={style["product-modal-close"]}>
                        <ArrowIcon/>
                    </div>
                    <div className={style["product-modal-header"]}>{product?.name}</div>
                    <div className={style["product-modal-bottom-block"]}>
                        <div className={style["product-modal-bottom-block-left"]}>
                            <img 
                            src={`${_URL}/api/products/image/${product?.images_id[0]}`} 
                            alt=""/>
                        </div>
                        <div className={style["product-modal-bottom-block-right"]}>
                            <div className={style["product-modal-prices"]}>
                                {
                                    product?.info.map((item,i)=>(
                                    <div key={item.price+i}
                                    onClick={()=>setActive(i)}
                                    className={style['product-modal-prices-item']+' '+(active==i?style['active']:'')}>
                                        {converter(item)}
                                    </div>))
                                }
                            </div>
                            <div className={style["product-modal-description"]}>{product?.description}</div>
                            <div className={style["product-modal-weight"]}>{
                                `${product.category=='pizza'?(active==0?'25см':active==1?'30см':"35см")+'.':''} `+
                                `${product.info[active]?.weight} ${product?.info[active]?.measure=='g'?'гр.':'л.'}`
                            }</div>
                            <PickedList product={product} onIndexChange={i=>setIndexes(i)}/>
                            <div
                            onClick={()=>addToCart()}
                            className={style["product-modal-price"]}>
                                {`В корзину за 
                                ${
                                    (product?.sale_percent==0?
                                        product?.info[active]?.price:
                                        Math.round((+product?.info[active]?.price/100)*(100-product?.sale_percent)))
                                }${indexes.length==0||'+'+indexes.reduce((a,i)=>a+=addList[i].price,0)}
                                ₽`}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
}

type PickedInput= {product:IProduct,onIndexChange:(i:number[])=>void}

const PickedList = ({product,onIndexChange}:PickedInput)=>{
    const [indexes,setIndexes]=useState<number[]>([])

    useEffect(()=>{onIndexChange(indexes)},[indexes])

    return product.category=='pizza'?
        <div className={style["product-modal-add-products"]}>
            {
                indexes.length>0?
                <div onClick={()=>setIndexes([])} className={style["product-modal-add-products-remove-all"]}>
                    Убрать всё
                </div>
                :''
            }
            <div className={style["product-modal-add-list"]}>
                {
                    addList.map((item,i)=>(
                        <div key={item.id+''+i} 
                        onClick={()=>setIndexes(s=>s.includes(i)?s.filter(s=>s!=i):[...s,i])}
                        style={{border:`2px solid ${indexes.includes(i)?primary_color:'white'}`}}
                        className={style["product-modal-add-list-item"]}>
                            <img className={style["product-modal-add-list-item-img"]} src={prefix+item.image} alt="" />
                            <div className={style["product-modal-add-list-item-header"]}>
                                {item.name}
                            </div>
                            <div className={style["product-modal-add-list-item-price"]}>
                                {item.price}₽
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        :''
}


const ArrowIcon = () =>
<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>