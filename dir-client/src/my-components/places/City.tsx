import { useCityModal } from '@/store'
import style from '@/styles/city.module.scss'
import { useEffect, useState } from "react"

export default ()=>{
    const [isClient, setIsClient] = useState(false);
    const [city, setCity] = useState('');
    const { open, setOpen } = useCityModal(s => s);


    useEffect(() => {
        setIsClient(true)
        const LSCity = localStorage.getItem('city')
        if (LSCity == null)
            setCity('Выбрать')
        else {
            const city = JSON.parse(LSCity)
            setCity(city['name'])
        }
    }, []);

    return !isClient ||
        <div
            onClick={() => setOpen(true)}
            className={style['header']}>
            Город доставки: <span>{city}</span>
        </div>
}