import {useEffect, useRef, useState} from "react";

export const Seconds = () => {
   const [date, setDate] = useState(0)
   const startDateRef = useRef(new Date())

    useEffect(() => {
        const id = setInterval(() => {
            console.log('tick')
            const currentDate = new Date();
            setDate(currentDate.getTime() - startDateRef.current.getTime());
        }, 1000)

        return () => {
            clearInterval(id)
        }
    }, []);

   // delay(3000)
    return <div>{(date / 1000).toFixed(0)}</div>
}


const delay = (ms: number) =>{
    const startDate = new Date().getTime();
    while(true) {
        const endDate = new Date().getTime();
        if (endDate - startDate > ms) {
            break;
        }
    }
}