'use client'
import {useRouter} from 'next/router'
import { useEffect } from 'react'

export default ()=>{
    useEffect(()=>void useRouter().push('/'),[])
    return <></>
}