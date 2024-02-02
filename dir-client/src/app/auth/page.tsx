'use client'
import Auth from "@/my-components/auth/Auth";
import { primary_color } from "@/const";
import { useUserStore } from "@/store";
import { useEffect } from "react";

export default ()=>{
    const id = useUserStore(s=>s.id)
    useEffect(()=>{id?window.location.pathname='/':''},[])
    return  <div style={{background:primary_color}}>
                <Auth show={true} selfPage={true}/>
            </div>
}