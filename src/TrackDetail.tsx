import type {TrackResponse} from "./types.ts";
import {useEffect, useRef, useState} from "react";
import {api} from "./api.ts";

type Props = {
    trackId: string | null
}

export function TrackDetail(props: Props) {

    const [detailQueryStatus, setDetailQueryStatus] = useState<'pending' | 'success' | 'loading'>('pending')
    const [track, setTrack] = useState<TrackResponse | null>(null) // denormalization

    const abortControllerRef = useRef<null | AbortController>(null) // denormalization

    useEffect(() => {
        abortControllerRef.current?.abort()

        if (!props.trackId) {
            return;
        }

        setDetailQueryStatus('loading');

        abortControllerRef.current = new AbortController();

        api.getTrack(props.trackId, abortControllerRef.current)
            .then(json => {
                setTrack(json);
                setDetailQueryStatus('success');
            })

    }, [props.trackId]);

    return  <div>
        <h2>Detail</h2>
        {detailQueryStatus === 'loading' && <p>Loading...</p>}

        {detailQueryStatus === 'success' && track && <div>
            <h3>{track.data.attributes.title}</h3>
            <div>{track.data.attributes.addedAt}</div>
            <div>likes: {track.data.attributes.likesCount}</div>
            <div>lyrics: {track.data.attributes.lyrics}</div>
        </div>
        }

    </div>
}