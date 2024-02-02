'use client'
import style from '@/styles/home/products/product.module.scss'
import { IProduct } from '@/interfaces/interfaces'
import { useEffect, useRef, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import { categories, primary_color } from '@/const'
import { getAllProductsHttp } from '@/http/product.http'
import ProductItem from './ProductItem'
import { useHeaderScrollStore } from '@/store'

export default ()=>{
    type List = {title:string,products:IProduct[]}
    const [list,setList]=useState<List[]>([])
    const [isLoading,setIsLoading]=useState(true)
    const refList = useRef<HTMLDivElement[]|null[]>([])
    const setIndex = useHeaderScrollStore(s=>s.setIndex)

    useEffect(()=>{
        getAllProductsHttp()
        .then(data=>{
            if(!data) 
                return 
            const thisList = []
            for(let item in categories){
                const total:List = {title:categories[item],products:[]}
                data.forEach(product=>{
                    if(product.category==item)
                        total.products.push(product)
                })
                thisList.push(total)
            }
            setList(thisList)
            setIsLoading(false)
            scrollListener(refList.current)
        })
    },[])
    
    const scrollListener=(itemsList:HTMLDivElement[]|null[])=>{
        const sizes:number[][] = []
        if(itemsList.length>0){
            let index = 0;
            for(let item of itemsList){
                const height = item?.clientHeight||0
                const offset = item?.offsetTop||0
                sizes.push([offset,offset+height,index])
                index++
            }
        }
        window.addEventListener('scroll',()=>{
            const Y = window.scrollY
            const filtered = sizes.filter(item=>item[0]<=Y&&item[1]>=Y)
            const index = filtered.length>0?filtered?.[0]?.[2]:-1
            if(Y<=10) 
                setIndex(-1)
            if(filtered.length>0)
                setIndex(index)
            })
    }

    if(isLoading) 
        return <div style={{
            marginTop:'20px',display:'flex',justifyContent:'center'}}>
            <MoonLoader color={primary_color}/>
        </div>
    return <div className={style['products-list']}>
                {
                    list.map((item,i)=>(
                        <div id={'id-'+Object.keys(categories)[i]} key={item.title} ref={e=>refList.current[i]=e} className={style["products-list-block"]}>
                            <div className={style["products-list-title"]}>
                                {item.title}
                            </div>
                            <div className={style["products-list-items"]}>
                                {item.products.map(product=>(
                                    <ProductItem key={product.id} product={product}/>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
}