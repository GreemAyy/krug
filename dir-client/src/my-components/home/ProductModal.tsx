import { useCartStore, useHideScroll, useModalStore } from '@/store'
import style from '@/styles/home/modal.module.scss'
import { useEffect, useRef, useState } from 'react'
import { _URL, categories, primary_color } from '@/const'
import { useRouter } from 'next/navigation'
import type { ICart, Info } from '@/interfaces/interfaces'
import { addItemToCart, addList, prefix, updateLS } from '@/tools/list'

export default ()=>{
    const {setIsOpened,product,setProduct,isOpened} = useModalStore(s=>s)
    const router = useRouter()
    const [active,setActive] = useState(0)
    const [op,setOp] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [height,setHeight] = useState(0)
    const [indexes,setIndexes] = useState<number[]>([])
    const list = useCartStore(s=>s.list) 
    const setHide = useHideScroll(s=>s.setHide)

    useEffect(()=>{
        if(isOpened) {
            setOp(true)
            document.title=categories[product?.category||'pizza']+' '+product?.name||'Null'
            setHide(true)
        }
        if(ref.current!=null)
            setHeight(ref.current!?.clientHeight/(window.screen.height/100))
    },[isOpened])
    useEffect(()=>{
        if(isOpened)
            window.addEventListener('change',()=>{
                setHeight(ref.current!?.clientHeight/(window.screen.height/100))
            })
    },[])
    const close=()=>{
        router.replace('/',{scroll:false})
        setOp(false)
        setHeight(0)
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
        close()
    }

    if(!product) return ''
    return  <div  style={{display:isOpened?'block':'none'}}
                className={style['product-modal']}>
                <div onClick={()=>close()} style={{opacity:+op}} className={style["modal-bg"]}/>
                <div style={{opacity:+op}} 
                className={style["product-modal-full"]}>
                <div ref={ref} className={style["product-modal-block"]}>
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
                            <div
                            onClick={()=>addToCart()}
                            className={style["product-modal-price"]}>
                                {`В корзину за 
                                ${
                                    (product?.sale_percent==0?
                                        product?.info[active]?.price:
                                        Math.round((+product?.info[active]?.price/100)*(100-product?.sale_percent)))
                                }
                                ${indexes.length!=0?'+ '+indexes.reduce((a,i)=>a+=addList[i].price,0):''}
                                ₽`}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    product.category!='pizza'||
                    <div style={{height:height+'vh'}} className={style["product-modal-add-products"]}>
                        <div className={style["product-modal-add-products-header"]}>
                            Добавить ингридиенты
                        </div>
                        {
                            !(indexes.length>0)||
                            <div onClick={()=>setIndexes([])} className={style["product-modal-add-products-remove-all"]}>
                                Убрать всё
                            </div>
                        }
                        <div className={style["product-modal-add-list"]}>
                            {
                                addList.map((item,i)=>(
                                    <div key={item.id+''+i} 
                                    onClick={()=>
                                        setIndexes(s=>s.includes(i)?s.filter(s=>s!=i):[...s,i])}
                                    style={{border:`2px solid ${indexes.includes(i)?primary_color:'white'}`}}
                                    className={style["product-modal-add-list-item"]}>
                                        <img className={style["product-modal-add-list-item-img"]} src={prefix+item.image} alt="" />
                                        <div 
                                        style={{fontSize:'12px',fontWeight:600}}
                                        className={style["product-modal-add-list-item-header"]}>
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
                }
                </div>
            </div>
}