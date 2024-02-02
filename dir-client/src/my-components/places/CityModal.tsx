import style from '@/styles/city.module.scss'
import { useCityModal, useHideScroll } from "@/store"
import { useEffect, useState } from 'react'
import { throttle } from '@/tools/throttle'
import { MoonLoader } from 'react-spinners'
import { ICity } from '@/interfaces/interfaces'
import { getCitiesLike } from '@/http/places.http'
import { primary_color } from '@/const'

export default ()=>{
    const {open,setOpen} = useCityModal(s=>s) 
    const {isHide,setHide} = useHideScroll(s=>s)
    const [showBody,setShowBody] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [citiesList,setCitiesList] = useState<ICity[]>([])
    const [input,setInput] = useState('')

    useEffect(()=>{
        if(input){
            setIsLoading(true)
            getCitiesLike(input)
            .then(data=>{
                setCitiesList(data)
                setIsLoading(false)
            })
        }
    },[input])

    useEffect(()=>{
        setTimeout(()=>setShowBody(open),100)
        if(open) {
            setHide(true)
        }else {
            setOpen(false)
            setHide(false)
        }
    },[open])

    const pickCity=({id,name}:ICity)=>{
        localStorage.setItem('city',JSON.stringify({id,name}))
        window.location.reload()
    }

    return  <div 
            style={{display:open?'block':'none'}}
            className={style["modal"]}>
                <div 
                onClick={()=>setOpen(false)}
                style={{display:open?'block':'none'}} 
                className={style["modal-bg"]}></div>
                <div style={{scale:showBody?1:0}}
                className={style["modal-body"]}>
                    <div className={style["modal-header"]}>
                        Выберите город
                    </div>
                    <input 
                    className={style["modal-input"]}
                    onChange={throttle((e:any)=>setInput(e.target.value),500)} type="text" />
                    <div className={style["cities-list"]}>
                        {
                            isLoading?
                            <MoonLoader color={primary_color}/>:
                            citiesList.map(city=>
                                <div 
                                onClick={()=>pickCity(city)}
                                className={style['city-item']}>
                                    {city.region}, г.{city.name}
                                </div>)
                        }
                    </div>
                </div>
            </div>
}