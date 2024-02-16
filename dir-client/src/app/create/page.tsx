'use client'
import { createProductHttp, uploadImageHttp } from '@/http/product.http';
import { IProduct, Info} from'@/interfaces/interfaces';
import { useState } from'react';
import { useForm } from'react-hook-form'
import {categories} from "@/const";

interface IParam{
    name:string
    description:string
    files:FileList
    category:string
}
export default ()=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [infos,setInfos]=useState<number[]>([1])

    const create = async(data:IParam)=>{
        const files:(number|null)[] = []
        for(let file of data.files){
            files.push(await uploadImageHttp(file))
        }
        if(!files.includes(null)){
            const product:IProduct = {
                name:data.name,
                description:data.description,
                images_id:files as number[],
                info:toList(data),
                category:data.category,
                sale_percent:0,
            }
            await createProductHttp(product)
        }
    }

    const toList = (data:{[k:string]:any})=>{
        const list:Info[] = []
        infos.forEach((_,idx)=>{
            list.push({
                price:+data[`price-${idx}`],
                weight:+data[`weight-${idx}`],
                quantity:+data[`quantity-${idx}`],
                measure:data[`measure-${idx}`],
                size:data[`size-${idx}`]
            })
        })
        return list
    }

    return <form
    onSubmit={handleSubmit(create as any)}
    style={{display:'flex',flexDirection:'column'}}
    className="create">
        <input placeholder='Название' type='text' {...register('name')}/>
        <textarea placeholder='Описание' id="" cols={30} rows={10} {...register('description')}></textarea>
        <input placeholder='Фото' multiple type="file" {...register('files')}/>
        <div 
        style={{margin:'10px'}}
        className="infos-list">
            <div onClick={_=>setInfos(s=>[...s,s.length])} className="up">Добавить</div>
            <div onClick={_=>setInfos(s=>s.slice(0,s.length-1))} className="down">Убрать</div>
            <div
            style={{display:'flex'}}
            className="list-block">
            {
                infos.map((_,i)=>
                    <div key={i} style={{display:'flex',flexDirection:"column"}}>
                        <input 
                        defaultValue={1}
                        placeholder='Цена' type='number' {...register(`price-${i}`)}/>
                        <input
                        defaultValue={1}
                        placeholder='Вес' type='text' {...register(`weight-${i}`)}/>
                        <input defaultValue={1} 
                        placeholder='Кол-во' type='number' {...register(`quantity-${i}`)}/>
                        <input placeholder='Мера' type='string' {...register(`measure-${i}`)}/>
                        <input placeholder='Размер' type='string' {...register(`size-${i}`)}/>
                    </div>)
            }
            </div>
        </div>
        <select defaultValue='o' {...register('category')}>
            {
                Object.keys(categories).map(item=>
                    <option key={item} value={item}>{(categories as {[key:string]:string})[item]}</option>)
            }
        </select>
        <input type='submit' onSubmit={e=>{e.preventDefault()}}/>
    </form>
};