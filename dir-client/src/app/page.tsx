'use client'
import Auth from '@/my-components/auth/Auth';
import Cart from '@/my-components/home/cart/Cart';
import Header from '@/my-components/home/Header';
import ProductModal from '@/my-components/home/ProductModal';
import ProductsList from '@/my-components/home/products/ProductsList';
import { getSingleProductHttp } from '@/http/product.http';
import { useHideScroll, useModalStore, useUserStore } from '@/store';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import checkIsMobile from 'is-mobile'
import ProductModalMobile from '@/my-components/home/ProductModalMobile';
import CityModal from '@/my-components/places/CityModal';

export default function Home() {
  const search = useSearchParams()
  const id = search.get('id')
  const setProduct=useModalStore(s=>s.setProduct)
  const setIsOpened=useModalStore(s=>s.setIsOpened)
  const [show,setShow]=useState(false)
  const hideScroll = useHideScroll(s=>s.setHide)
  const [isMobile,setIsMobile]=useState(false)

  useEffect(()=>{
    if(id!=null){
      getSingleProductHttp(+id)
      .then(data=>{
        if(data==null) return;
        setProduct(data)
        setIsOpened(true)
      })
    }
    setIsMobile(checkIsMobile())
  },[])
  const showAuth=(set:boolean)=>{
    setShow(set)
    hideScroll(set)
  }

  return (
    <main>
        <div style={{position:'absolute',width:'100%',zIndex:996,overflowX:'hidden'}} className="main-block">
          <Header open={()=>showAuth(true)}/>
          <ProductsList/>
          {isMobile?
            <ProductModalMobile/>:
            <ProductModal/>
          }
          <Cart/>
        </div>
        <CityModal/>
        <Auth show={show} close={()=>showAuth(false)}/>
    </main>
  )
}
