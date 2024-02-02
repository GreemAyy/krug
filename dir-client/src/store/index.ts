'use client'
import { ICart, IProduct } from '@/interfaces/interfaces'
import { getCookiesAll } from '@/tools/cookie'
import {create} from 'zustand'

export const useUserStore=create<UserStore>(set=>{
    let cookies = null;
    if(typeof window !== 'undefined') cookies = getCookiesAll()
    return {
        id:cookies?+cookies['id']:null,
        hash:cookies?cookies['hash']:null,
        setId:(id)=>set({id}),
        setHash:(hash)=>set({hash})
    }
})
interface UserStore{
    id:number|null
    hash:string|null
    setId:(id:number|null)=>void
    setHash:(hash:string|null)=>void
}

export const useHeaderScrollStore = 
create<HeaderScrollStore>(set=>({
    index:-1,
    setIndex:(i)=>set({index:i}),
}))
interface HeaderScrollStore{
    index:number,
    setIndex:(i:number)=>void
}

export const useModalStore = create<ModalStore>(set=>({
    product:null,
    isOpened:false,
    setIsOpened:(o)=>set({isOpened:o}),
    setProduct:(p)=>set({product:p})
}))
interface ModalStore{
    product:IProduct|null,
    isOpened:boolean,
    setProduct:(product:IProduct|null)=>void
    setIsOpened:(open:boolean)=>void
}

export const useCartStore = create<CartStore>(set=>({
    isOpened:false,
    setIsOpened:(o)=>set({isOpened:o}),
    list:[],
    setList:(list)=>set({list})
}))
interface CartStore{
    isOpened:boolean
    setIsOpened:(open:boolean)=>void
    list:ICart[]
    setList:(l:ICart[])=>void
}

export const useHideScroll=create<HideScroll>(set=>({
    isHide:false,
    setHide:(h)=>{
        set({isHide:h})
        const body = document.querySelector('body')
        if(h)
            body!.setAttribute('style',`
            overflow: hidden !important;
            overscroll-behavior: contain;
            padding-left: 0px;
            padding-top: 0px;
            padding-right: 0px;
            margin-left: 0;
            margin-top: 0;
            margin-right:17px !important`)
        else 
            body!.removeAttribute('style')
    },
}))
interface HideScroll{
    isHide:boolean
    setHide:(h:boolean)=>void
}

export const useCityModal=create<CityModal>(set=>({
    open:false,
    setOpen:open=>set({open})
}))
type CityModal={
    open:boolean
    setOpen:(o:boolean)=>void
}