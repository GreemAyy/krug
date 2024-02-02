'use client'
import { primary_color } from '@/const'
import { getUserHttp, updateUserHttp } from '@/http/user.http'
import { useUserStore } from '@/store'
import style from '@/styles/account.module.scss'
import { clearCookiesAll } from '@/tools/cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { MoonLoader } from 'react-spinners' 

enum AlertStatus{
    Default='rgb(68, 118, 255)',
    Done='rgb(19, 233, 83)',
    Error='rgba(219,0,0)'
}

export default ()=>{
    const router = useRouter()
    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [date,setDate]=useState('')
    const [loading,setLoading]=useState(true)
    const {id,hash} = useUserStore(s=>({id:+(s.id||0),hash:(s.hash||'')}))
    const [alertStatus,setAlertStatus] = useState(AlertStatus.Default)
    
    useEffect(()=>{
        if(id)
            getUserHttp(id)
            .then(({phone,name,dob})=>{
                setPhone(phone)
                setName(name)
                setDate(dob)
                setLoading(false)
            })
        else 
            router.replace('/')
    },[])

    const update=async()=>{
        const {update} = await updateUserHttp({id,hash,name:name,dob:date})
        setAlertStatus(update?AlertStatus.Done:AlertStatus.Error)
    }

    return  <div className={style['account-block']}>
                <div className={style["account-header"]}>
                    <div 
                    onClick={()=>router.push('/')}
                    className={style["account-logo"]}>
                        Круг
                    </div>
                    <div className={style["account-header-text"]}>
                        Редактирование профиля {">"}
                    </div>
                </div>
                {
                loading?    
                <MoonLoader cssOverride={{marginTop:'20px'}} color={primary_color}/>:
                <div className={style["account-form"]}>
                    <div className={style["account-form-header"]}>Имя</div>
                    <input 
                    value={name} onChange={e=>setName(e.target.value)}
                    className={style["account-form-input"]} type="text" placeholder='Изменить имя'/>
                    <div className={style["account-form-header"]}>Телефон</div>
                    <input 
                    style={{background:"D3D3D3"}}
                    value={phone} readOnly className={style["account-form-input"]} 
                    type="tel" placeholder='Изменить телефон'/>
                    <div className={style["account-form-header"]}>Дата рождения</div>
                    <input 
                    value={date} onChange={e=>setDate(e.target.value)} 
                    className={style["account-form-input"]} type='date' placeholder='Изменить дату рождения'/>
                    <br/>
                    <div>
                        <button 
                        onClick={update}
                        style={{background:alertStatus}}
                        className={style["save-data"]}>
                            {
                                alertStatus==AlertStatus.Default?
                                'Сохранить':
                                alertStatus==AlertStatus.Done?
                                'Обновлено':
                                'Ошибка'
                            }
                        </button>
                        <button 
                        onClick={()=>{
                            clearCookiesAll()
                            window.location.pathname='/'
                        }}
                        className={style["log-out"]}>
                            Выйти
                        </button>
                    </div>
                </div>}
            </div>
}