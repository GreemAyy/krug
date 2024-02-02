import { primary_color } from '@/const'
import { createCodeHttp, createUserHttp } from '@/http/user.http'
import style from '@/styles/auth.module.scss'
import { setCookie } from '@/tools/cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PhoneInput from 'react-phone-number-input/input'

type Input = {show:boolean,close?:()=>void,selfPage?:boolean}
export default ({show,close,selfPage=false}:Input)=>{
    const [phone,setPhone]=useState<string>()
    const [next,setNext]=useState(false)
    const [code,setCode]=useState<string>()
    const [err,setErr]=useState(false)
    const [again,setAgain]=useState(false)
    const [codeErr,setCodeErr]=useState(false)
    const router = useRouter()

    const check=async()=>{
        if(phone?.length==12){
            setErr(false)
            setNext(true)
            setTimeout(()=>setAgain(true),60000)
            const code = await createCodeHttp(phone)
            console.log(code)
        }else setErr(true)
    }
    const commit=async(e:string)=>{
        if(e.length<=4)
            setCode(e)
        if(e.length==4&&phone){
            const create = await createUserHttp(phone,e)
            setCodeErr(!create)
            if(create){
                setCookie('id',create.id)
                setCookie('hash',create.hash)
                window.location.pathname='/'
            }
        }
    }

    return /*->*/(
        <div 
        style={{
        right:show?0:'-100vw',
        borderRadius:!show?'100%':0}}
        className={style['auth-block']}>
            <div 
            //@ts-ignore
            onClick={()=>selfPage?router.back():close()} 
            className={style["close-btn"]}>
                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-40.png" alt="" />
                <div>Назад</div>
            </div>
                <div className={style["auth-form-block"]}>
                    <div
                    style={{top:next?'-100vh':'50%'}}
                    className={style['auth-form-phone']}>
                        <div className={style["auth-block-header"]}>
                            Войти
                        </div>
                        <div className={style["auth-phone-block"]}>
                            <PhoneInput 
                            placeholder="8 (900) 700-60-50"
                            country="RU"
                            style={{outline:'none'}}
                            value={phone}
                            //@ts-ignore
                            onChange={setPhone}/>
                        </div>
                        {
                            !err||
                            <div className={style['auth-error']}>
                                Неправильная длина номера
                            </div>
                        }
                        <div
                        onClick={check}
                        className={style["auth-submit"]}>
                            Отправить код
                        </div>
                    </div>
                    <div
                    style={{bottom:next?'50%':'-100vh'}}
                    className={style["auth-code"]}>
                        <div 
                        // onClick={()=>setNext(false)}
                        className={style["auth-code-back"]}>
                            <img 
                            style={{transform:"rotate(90deg)"}}
                            src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-25.png" alt="" />
                            <span>Изменить номер</span>
                        </div>
                        <div className={style["auth-code-header"]}>
                            <span>Введите код</span> который вам отправили на телефон.
                        </div>
                        <input 
                        value={code}
                        onChange={e=>commit(e.target.value)}
                        type="number" className={style["auth-code-input"]}/>
                        {!codeErr||
                        <div style={{color:primary_color,marginBottom:'.5vw',fontSize:'1.25vw'}}>Неправильный код</div>}
                        <div 
                        style={{opacity:again?1:.8,pointerEvents:again?'visible':'none'}}
                        className={style["auth-send-code"]}>
                            Отправить снова
                        </div>
                    </div>
                </div>
        </div>)
}