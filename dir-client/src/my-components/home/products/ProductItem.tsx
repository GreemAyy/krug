import { _URL } from "../../../const"
import { IProduct } from "@/interfaces/interfaces"
import style from '../../../styles/home/products/product-item.module.scss'
import { useModalStore } from "@/store"
import { useRouter } from "next/navigation"

type Input = {product:IProduct}
export default ({product}:Input)=>{
    const {setIsOpened,setProduct} = useModalStore(s=>s)
    const router = useRouter()

    return  <div 
            onClick={()=>{
                setProduct(product)
                setIsOpened(true)
                router.replace('?id='+product.id,{scroll:false})
            }}
            className={style["product-item"]}>
                <div className={style["product-item-left"]}>
                    <img src={`${_URL}/api/products/image/${product.images_id[0]}`} alt="" />
                </div>
                <div className={style["product-item-right"]}>
                    <div className={style["product-item-name"]}>{product.name}</div>
                    <div className={style["product-item-desc"]}>{product.description}</div>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div className={style["product-item-price"]}>
                        {
                            (product.info.length>1?'от ':'')+
                            (product.sale_percent==0?
                                product.info[0].price:
                                Math.round((+product.info[0].price/100)*(100-product.sale_percent)))+' ₽'
                        }
                        </div>
                        {
                            !product.sale_percent||
                            <div className={style["product-item-sale-price"]}>
                            {product.info[0].price}₽
                            </div>
                        }
                    </div>
                </div>
            </div>
   
}