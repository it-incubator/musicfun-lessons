import {useEffect, useEffectEvent, useState} from "react";

export const InfinityListV1 = () => {
    const [tracks, setTracks] = useState<string[]>([])
    const [page, setPage] = useState(1)

    const event = useEffectEvent( () => {
        const newTracksFromServer = new Array(10).fill('1');
        console.log(page)
        setTracks([...tracks, ...newTracksFromServer] );
    })

    useEffect(() => {
        setTimeout(() => {
            event()
        }, 1000)
    }, [page])

    const handleClick = () => {
        setPage(page + 1)
    }

    return <div>
        {tracks.map((_, i) => {
            return (<div key={i} style={{height: '30px',
                border: '1px solid yellow',
            margin: '20px'}}>{i + 1}</div>)
        })}
        <button onClick={handleClick}>Show more</button>
    </div>
}