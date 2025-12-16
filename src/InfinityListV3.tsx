import {useEffect, useEffectEvent, useRef, useState} from "react";


const useInter = (handler: () => void, targetElement: HTMLElement | null) => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const event = useEffectEvent(() => {
        handler();
    })

    useEffect(() => {
        console.log('✈️ EFFECT')
        if (!targetElement) return;

        observerRef.current = new IntersectionObserver( (entries) => {
            if (entries[0].isIntersecting) {
                event();
            }
        })
        observerRef.current.observe(targetElement!)

        return  () => {
            console.log('UNMOUNTING, buttonRef: ' + targetElement)
            console.log('UNMOUNTING, observerRef: ' + observerRef.current)
            observerRef.current!.disconnect()
            observerRef.current!.unobserve(targetElement)
        }
    }, [targetElement]);
}

export const InfinityListV3 = () => {
    console.log("InfinityListV2 rendering...");
    const [tracks, setTracks] = useState<string[]>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

    const handleClick = () => {
        console.log(">> handleClick, isLoading: " + isLoading);
        if (isLoading) return;
        console.log("tracks.length inside useEffectEvent: " + tracks.length);
        setPage(page + 1)
        setIsLoading(true)

        fetchTracks(5000, 'eventEffect').then(newTracksFromServer => {
            setTracks((prev) =>[...prev, ...newTracksFromServer]);
            setIsLoading(false)
        })
    }

    useInter(handleClick, targetElement)

    useEffect(() => {
        fetchTracks(1000, 'effect').then(newTracksFromServer => {
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
        { tracks &&  <button ref={(el) => {
            setTargetElement(el)
            return () => {
                setTargetElement(null)
            }
        }}>Show more</button> }
    </div>
}


const fetchTracks = (msDelay = 5000, src) => {
    console.log('Fetching tracks... 🎹 from: ' + src);
    return new Promise<string[]>(res => {
        setTimeout(() => {
            const newTracksFromServer = new Array(10).fill('1');
            res(newTracksFromServer)
        }, msDelay)
    })
}

// todo: показали кнопку убрали и тут же опять показали.. полетит 2 запроса
//


// todo: other list with tricky target elemtn appearing\dissapiring
// and implement custom hook