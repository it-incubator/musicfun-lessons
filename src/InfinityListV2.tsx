import {useEffect, useEffectEvent, useRef, useState} from "react";

export const InfinityListV2 = () => {
    const [tracks, setTracks] = useState<string[]>([])
    const [page, setPage] = useState(1)

    const observerRef = useRef<IntersectionObserver | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    // todo: show refFunction for bind to html element

    const handleClick = useEffectEvent(() => {
        setPage(page + 1)
        setTimeout(() => {
            console.log(page + 1)
            const newTracksFromServer = new Array(10).fill('1');
            setTracks([...tracks, ...newTracksFromServer]);
        }, 5000)
    })

    useEffect(() => {
        observerRef.current = new IntersectionObserver( (entries) => {
            if (entries[0].isIntersecting) {
                handleClick();
            }
        })
        observerRef.current.observe(buttonRef.current!)

        const button = buttonRef.current!;

        return  () => {
            console.log('UNMOUNTING, buttonRef: ' + button)
            console.log('UNMOUNTING, observerRef: ' + observerRef.current)
            observerRef.current!.disconnect()
            observerRef.current!.unobserve(button)
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const newTracksFromServer = new Array(10).fill('1');
            setTracks(newTracksFromServer);
        }, 1000)
    }, [])

    return <div>
        {tracks.map((_, i) => {
            return (<div key={i} style={{height: '30px',
                border: '1px solid yellow',
            margin: '20px'}}>{i + 1}</div>)
        })}
        <button ref={buttonRef}>Show more</button>
    </div>
}


// todo: показали кнопку убрали и тут же опять показали.. полетит 2 запроса
//


// todo: other list with tricky target elemtn appearing\dissapiring
// and implement custom hook