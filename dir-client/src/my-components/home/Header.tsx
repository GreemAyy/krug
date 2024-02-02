import style from '@/styles/home/home-header.module.scss'
import index from '@/styles/index.module.scss'
import { categories, primary_color } from '@/const'
import { useCartStore, useHeaderScrollStore, useUserStore } from '@/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import City from '@/my-components/places/City'
import checkIsMobile from 'is-mobile'
import Link from 'next/link'

type Input = {open:()=>void}
const LogInIcon = "https://cdn0.iconfinder.com/data/icons/user-interface-2063/24/UI_Essential_icon_expanded-58-30.png"
const UserIcon = "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-30.png"
const CartIcon = "https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-4/256/shopping-cart-50.png"

export default ({open}:Input)=>{
    const {pickedIndex, setIndex} = useHeaderScrollStore(({index,setIndex})=>({pickedIndex:index,setIndex}))
    const {setIsOpened, list} = useCartStore(s=>s)
    const [hover,setHover]=useState(false)
    const {id}= useUserStore(s=>s)
    const router = useRouter()
    const [isClient,setIsClient]=useState(false)
    const [isMobile,setIsMobile]=useState(false)

    useEffect(()=>{
        setIsClient(true)
        setIsMobile(checkIsMobile())
    },[])

    return (
    <>
        <div className={style["header-up"]}>
            <div className={style["header-left"]}>
                <div id='id-logo' 
                className={`${style['header-logo']} ${index['primary-color']}`}>
                    Круг
                </div>
                <City/>
            </div>
            <div className={style["header-user"]}>
                {   
                    !isClient||
                    !id?
                    <div onClick={open} className={style["user"]}>
                        <img 
                        style={{width:'30px',margin:'0 auto'}}
                        src={LogInIcon} alt="" />
                        <div>Войти</div>
                    </div>:
                    <div 
                    onClick={()=>router.push('/account')}
                    className={style["user"]}>
                        <img 
                        style={{width:'30px',margin:'0 auto'}}
                        src={UserIcon} alt="" />
                        <div>Профиль</div>    
                    </div>
                }
            </div>
        </div>
        <div 
        style={{
            position:pickedIndex>=0?'fixed':'static',
            left: pickedIndex>=0?'50%':'0',
            transform: pickedIndex>=0?'translate(-50%,0)':''}}
            className={style["header-cat-list"]}>
            <div className={style["header-cat-left"]}>
                {   
                    Object.values(categories).map((item,i)=>
                    <Link key={item}
                    scroll={true}
                    onClick={()=>setIndex(i)}
                    href={'#id-'+Object.keys(categories)[i]}
                    style={{textDecoration:'none',color:pickedIndex==i?primary_color:'black'}}
                    className={`${style['header-cat-item']} ${pickedIndex==i?style['active-item']:''}`}>
                        {item}
                    </Link>)
                }
            </div>
            <div 
            onMouseOver={()=>setHover(true)}
            onMouseOut={()=>setHover(false)}
            onClick={()=>setIsOpened(true)} 
            className={style["header-car-right"]}>
                <div className={style["header-cart-btn"]}>Корзина</div>
                <div 
                style={{background:'transparent'}}
                className={style['header-cart-quantity']}>
                    <div style={{opacity:+!hover,transition:'all .2s',color:primary_color}}>
                        {list.reduce((a,i)=>a+(i.quantity||0),0)}
                    </div>
                    <div 
                    style={{opacity:+hover,width:'30px',height:'30px',color:primary_color}}
                    className={style['header-arrow']}>
                        <ArrowIcon/>
                    </div>
                </div>
            </div>
        </div>
        {
            !isMobile||
            <div 
            onClick={()=>setIsOpened(true)}
            className={style['cart-icon']}>
                <img src={CartIcon} alt="" />        
            </div>
        }
    </>)
}

const ArrowIcon = () =>
<svg width="40px" height="40px" 
viewBox="0 0 24 24" fill="none" 
xmlns="http://www.w3.org/2000/svg" 
stroke="#000000">
    <g id="SVGRepo_bgCarrier" stroke-width="0">
    </g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.9200000000000004">
    </g>
    <g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>