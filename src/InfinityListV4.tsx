import {useCallback, useEffect, useEffectEvent, useRef, useState} from "react";

const useIntersectionObserver = (handler: () => void, isLoading: boolean) => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const event = useEffectEvent(() => {
        console.log(isLoading)
        if (isLoading) return;
        handler();
    })

    const targetRefCallback = useCallback((targetElement: HTMLElement | null) => {
        console.log('targetRefCallback 🎯')
        observerRef.current = new IntersectionObserver( (entries) => {
            if (entries[0].isIntersecting) {
                //if (isLoading) return;
                //handler();
                // todo: solution не соответствует документации.. useEffectEvent только для useEffect
                event();
            }
        })
        //observerRef.current.observe(targetRef.current!)
        observerRef.current.observe(targetElement!)

        return  () => {
            console.log('targetRefCallback 🎯 🧹')
            observerRef.current!.disconnect()
            observerRef.current!.unobserve(targetElement!)
            observerRef.current = null;
        }
    }, [])

    return targetRefCallback;
}

export const InfinityListV4 = () => {
    console.log('InfinityListV4 rendered')
    const [tracks, setTracks] = useState<string[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [page, setPage] = useState(1)

    // todo: show refFunction for bind to html element

    const handleClick = useCallback(() => {
        setIsLoading(true)
        setPage(prev => prev + 1)
        fetchTracks().then((newTracksFromServer) => {
            setTracks((prev) => [ ...(prev ? prev : []), ...newTracksFromServer]);
            setIsLoading(false)
        })
    }, [])

    const targetRefCallback = useIntersectionObserver(handleClick, isLoading)

    useEffect(() => {
        fetchTracks().then(newTracksFromServer => {
            setTracks(newTracksFromServer);
            setIsLoading(false)
        })
    }, [])

    return <div>
        {tracks?.map((_, i) => {
            return (<div key={i} style={{height: '30px',
                border: '1px solid yellow',
            margin: '20px'}}>{i + 1}</div>)
        })}
        {tracks && <button ref={targetRefCallback}>---</button>}
    </div>
}


const fetchTracks = () => {
    return new Promise<string[]>(res => {
        setTimeout(() => {
            const newTracksFromServer = new Array(10).fill('1');
            res(newTracksFromServer)
        }, 3000)
    })
}

// todo: показали кнопку убрали и тут же опять показали.. полетит 2 запроса
//


// todo: other list with tricky target elemtn appearing\dissapiring
// and implement custom hook