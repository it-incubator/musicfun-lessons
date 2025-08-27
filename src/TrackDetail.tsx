import {useEffect, useRef, useState} from "react";
import type {TrackResponse} from "./types.ts";
import {api} from "./api.ts";

type Props = {
    trackId: string | null
}

export function TrackDetail(props: Props) {
    const [detailQueryStatus, setDetailQueryStatus] = useState<'pending' | 'success' | 'loading'>('pending')
    const [track, setTrack] = useState<TrackResponse | null>(null) // denormalization

    const abortControllerRef = useRef<null | AbortController>(null) // denormalization

    useEffect( () => {
        abortControllerRef.current?.abort()

        if (!props.trackId) {
            setTrack(null)
            setDetailQueryStatus('pending');
            return;
        }

        abortControllerRef.current = new AbortController();

        setDetailQueryStatus('loading');

        api.getTrack(props.trackId, abortControllerRef.current.signal)
            .then(json => {
                setTrack(json);
                setDetailQueryStatus('success');
            })
    }, [props.trackId])

    if (detailQueryStatus === 'pending') {return <span>no track for display</span>}

    if (detailQueryStatus === 'loading') {
        return <div>loading...</div>
    }

    return  <div>
        <h2>Detail</h2>

            <h3>{track!.data.attributes.title}</h3>
            <div>{track!.data.attributes.addedAt}</div>
            <div>likes: {track!.data.attributes.likesCount}</div>
            <div>lyrics: {track!.data.attributes.lyrics}</div>

    </div>;
}