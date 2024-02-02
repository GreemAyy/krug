import { ICart } from "@/interfaces/interfaces"

export type Add={
    id:number
    name:string
    image:string,
    price:number
}
export const prefix = 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/'
export const addItemToCart=(item:ICart,list:ICart[])=>{
    const include = checkIncludes(item,list)
    if(include){
        list.map((i)=>{
            if(i.product.id==item.product.id&&i.quantity){
                i.quantity+=1
            }
        })
    }else
        list.push(item)
    return list
}
export const updateLS=(added:ICart[])=>localStorage.setItem('cart',JSON.stringify(added))
export const checkIncludes=(item:ICart,list:ICart[])=>
    Boolean(list.filter(({product,extras,size})=>
        product.id==item.product.id&&
        !item.extras?.length&&
        !extras?.length&&
        size==item.size).length)
export const addList:Array<Add>=
[{id:1,name:'Сливочная моцарелла',image:'cdea869ef287426386ed634e6099a5ba.png',price:99},
{id:2,name:'Чеддер и пармезан',image:'000D3A22FA54A81411E9AFA69C1FE796',price:99},
{id:3,name:'Острый халапеньо',image:'11ee95b6bfdf98fb88a113db92d7b3df.png',price:79},
{id:4,name:'Нежный цыпленок',image:'000D3A39D824A82E11E9AFA5B328D35A',price:99},
{id:5,name:'Шампиньон',image:'000D3A22FA54A81411E9AFA67259A324',price:79},
{id:6,name:'Бекон',image:'000D3A39D824A82E11E9AFA637AAB68F',price:99},
{id:7,name:'Ветчина',image:'000D3A39D824A82E11E9AFA61B9A8D61',price:99},
{id:8,name:'Пикантная пепперони',image:'000D3A22FA54A81411E9AFA6258199C3',price:99},
{id:9,name:'Острая чоризо',image:'000D3A22FA54A81411E9AFA62D5D6027',price:99},
{id:10,name:'Маринованные огурчики',image:'000D3A21DA51A81211E9EA89958D782B',price:79},
{id:11,name:'Свежие томаты',image:'000D3A39D824A82E11E9AFA7AC1A1D67',price:79},
{id:12,name:'Красны лук',image:'000D3A22FA54A81411E9AFA60AE6464C',price:79}]