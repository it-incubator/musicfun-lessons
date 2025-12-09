import {useEffect, useEffectEvent, useRef, useState} from "react";

export const SecondsUseEffectEvent = () => {
    const [seconds, setSeconds] = useState(0) // 1
    const [speed, setSpeed] = useState(1000) // 1

    const event = useEffectEvent(() => {
        setSeconds(seconds + 1); // 1 + 1
    })

    useEffect(() => {
        const id = setInterval(() => {
            event()
        }, speed)

        return () => {
            clearInterval(id)
        }
    }, [speed]);

    return <div>{seconds}</div>
}


