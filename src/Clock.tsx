import {useEffect, useState} from "react";

export const Clock = () => {
   const [date, setDate] = useState(new Date())

    useEffect(() => {
        const id = setInterval( () => {
            console.log('tick')
            const date = new Date();
            setDate(date)
        }, 1000)

        return () => {
            clearInterval(id)
        }
    }, []);

    return <div>{date.toString()}</div>
}