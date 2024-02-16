import { _URL, primary_color } from "@/const";
import { ICart } from "@/interfaces/interfaces";
import {cartPriceStore, useCartStore} from "@/store";
import style from '@/styles/home/cart.module.scss'
import mstyle from '@/styles/home/modal.module.scss'
import { addList, prefix } from "@/tools/list";
import { useEffect, useState } from "react";
import checkIsMobile from 'is-mobile'

const converter=({quantity,size}:{[key:string]:number|string})=>{
    if(size=='s') return 'Маленькая'
    if(size=='m') return 'Средняя'
    if(size=='l') return 'Большая'
    if(size=='o') return quantity==1?'Один размер':`${quantity} шт.`
}

type Input = {item:ICart,index:number,inc:(i:number)=>void,dec:(i:number)=>void,del:(i:number)=>void}

export default ({item,index,inc,dec,del}:Input)=>{
    const [indexes,setIndexes]=useState<number[]>([])
    const setList = useCartStore(s=>s.setList)
    const list = useCartStore(s=>s.list)
    const [show,setShow]=useState(false)
    const [op,setOp]=useState(false)
    const opacityTime = 150
    const isOpened = useCartStore(s=>s.isOpened)
    const [isMobile,setIsMobile]=useState(false)

    const filterIndexes=()=>{
        if(item.product.category=='pizza'){
            const indexList = []
            for(let i = 0;i<item.extras!?.length;i++){
              if(item!.extras){
                  const add = item!.extras[i]||0
                  if(!!item.extras?.filter(e=>e.id==add.id)) indexList.push(add.id)
              }
            } 
            setIndexes(indexList)
          }
    }
    useEffect(()=>{!isOpened?close():''},[isOpened])

    useEffect(()=>{
        filterIndexes()
        setIsMobile(checkIsMobile())
    },[])

    function open(){
        setShow(true)
        setTimeout(()=>setOp(true),opacityTime)
    }
    function close(){
        setOp(false)
        setTimeout(()=>setShow(false),opacityTime)
        filterIndexes()
    }

    const save =()=>{
        item.extras = addList.filter((item)=>indexes.includes(item.id)?item:void'')
        list[index] = item
        setList(list)
        localStorage.setItem('cart',JSON.stringify(list))
        cartPriceStore.update('price')
        close()
    }

    return  <div className={style["cart-item"]}>
                <div 
                onClick={()=>del(index)}
                className={style["cart-item-delete"]}>
                    <img src="https://cdn3.iconfinder.com/data/icons/user-interface-169/32/cross-30.png" alt="" />
                </div>
                <div className={style["cart-item-top"]}>
                    <div className={style["cart-item-image"]}>
                        <img src={`${_URL}/api/products/image/${item?.product?.images_id[0]}`} alt="" />
                    </div>
                    <div className={style["cart-item-info"]}>
                        <div className={style["cart-item-name"]}>
                            {item?.product.name}
                        </div>
                        <div className={style["cart-item-size"]}>
                            {converter({quantity:item?.product.info[0].quantity,size:item?.size})}
                        </div>
                        <div className={style["cart-item-extras"]}>
                            {item.extras?.map((item,i)=>(
                            <div key={item?.id}>
                                {item?.name}
                            </div>))}
                        </div>
                    </div>
                </div>
                <div className={style["cart-item-bottom"]}>
                    <div className={style["cart-item-price"]}>
                        {(item?.quantity||1)*
                        (item?.product.info.filter(i=>i?.size==item?.size)[0]?.price)+
                        (item?.quantity||1)*((item?.extras?.reduce((a,i)=>a+i?.price,0))||0)}₽
                    </div>
                    <div className={style["cart-item-quantity"]}>
                        <button 
                        onClick={_=>dec(index)}
                        className={`${style["cart-item-btn"]} ${style["minus"]}`}>-</button >
                        <div className={style["cart-item-quantity-count"]}>{item?.quantity}</div>
                        <button  
                        onClick={_=>inc(index)}
                        className={`${style["cart-item-btn"]} ${style["plus"]}`}>+</button >
                    </div>
                </div>
                {
                    item?.product.category=='pizza'?/*-?-*/
                    <div 
                    className={style["cart-item-extras"]}>
                        <div className={style["cart-item-extras-options"]}>
                            <div 
                            onClick={()=>show?close():open()}
                            className={style["cart-item-extras-header"]}>
                                {show?"Закрыть":"Изменить"} 
                            </div>
                        </div>
                        <div 
                        style={{
                            marginTop:'.25vw',
                            display:show?"grid":'none',
                            gridTemplateColumns:(
                                isMobile?"repeat(3,30vw)":"repeat(auto-fill, min(19%,33%))"),
                            transition:'all .3s',
                            gap:'1%',
                            opacity:op?1:0
                        }}
                        className={mstyle["cart-item-extras-list"]}>
                        {
                            addList.map((item,i)=>(
                                <div key={item.id+''+i} 
                                onClick={()=>setIndexes(s=>s.includes(item.id)?s.filter(s=>s!=item.id):[...s,item.id])}
                                style={{border:`2px solid ${indexes.includes(item?.id)?primary_color:'white'}`}}
                                className={mstyle["product-modal-add-list-item"]}>
                                    <img className={mstyle["product-modal-add-list-item-img"]} src={prefix+item.image} alt="" />
                                    <div 
                                    style={{fontWeight:600}}
                                    className={mstyle["product-modal-add-list-item-header"]}>
                                        {item.name}
                                    </div>
                                    <div className={mstyle["product-modal-add-list-item-price"]}>
                                        {item.price}₽
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                        <div 
                        style={{display:show?"grid":'none'}}
                        onClick={save}
                        className={style["cart-item-extras-save-changes"]}>
                            Сохранить
                        </div>
                    </div>:''
                }
            </div>
}