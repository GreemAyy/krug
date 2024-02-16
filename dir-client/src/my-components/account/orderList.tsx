import style from '@/styles/order/orderList.module.scss';
import {useEffect, useState} from "react";
import {IOrder} from "@/interfaces/interfaces";
import {MoonLoader} from "react-spinners";
import {primary_color} from "@/const";
import {getUserHttp} from "@/http/user.http";
import {useUserStore} from "@/store";
import {getUserOrders} from "@/http/order.http";
import {OrderStatus } from "@/interfaces/enums";
import {useRouter} from "next/navigation";

const statusToText :{[key:number]:string} = {
    [OrderStatus.Created]  :'Ожидает оплату',
    [OrderStatus.Canceled] :'Отменено',
    [OrderStatus.Preparing]:'Готовится',
    [OrderStatus.Done]     :'Выполнено',
}

const STATUS_COLORS :{[key:number]:string} = {
    [OrderStatus.Created]  :"rgb(184, 184, 184)",
    [OrderStatus.Canceled] :"rgb(255, 40, 40)",
    [OrderStatus.Preparing]:"rgb(46, 91, 255)",
    [OrderStatus.Done]     :"rgb(44, 228, 88)"
}

export default ()=>{
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState<IOrder[]>([])
    const id = useUserStore(s=>s.id);
    const router = useRouter()

    useEffect(() => {
        getUserOrders(id||0)
            .then(orders=>{
                setOrders(orders);
                setIsLoading(false)
            })
    }, []);

    return  <div className={style['main']}>
                <div className={style['header']}>
                    Заказы
                </div>
                {
                    isLoading?
                    <div className={style['loader']}>
                        <MoonLoader color={primary_color}/>
                    </div>:
                    <div className={style['list']}>
                        {
                            orders.map(order=>
                                <div
                                    onClick={()=>router.push(`/order/${order.id}`)}
                                    className={style['list-item']}>
                                    <div className={style['list-item-number']}>
                                        Заказ №{ order.id }
                                    </div>
                                    <div
                                        style={{color:STATUS_COLORS[order.status]}}
                                        className={style['status']}>
                                        {
                                            statusToText[order.status]
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
             </div>
}