import {useEffect, useRef} from "react";
import type {TrackResponse} from "./types.ts";
import {api} from "./api.ts";
import {useQuery} from "./hooks/utils/useQuery.ts";

type Props = {
    trackId: string | null
}


function useTrackDetail(trackId: string | null) {
    const {
        queryStatus: detailQueryStatus,
        setQueryStatus: setDetailQueryStatus,
        data: track,
        setData: setTrack
    } = useQuery<TrackResponse>('pending')

    const abortControllerRef = useRef<null | AbortController>(null) // denormalization

    useEffect( () => {
        abortControllerRef.current?.abort()

        if (!trackId) {
            setTrack(null)
            setDetailQueryStatus('pending');
            return;
        }

        abortControllerRef.current = new AbortController();

        setDetailQueryStatus('loading');

        api.getTrack(trackId, abortControllerRef.current.signal)
            .then(json => {
                setTrack(json);
                setDetailQueryStatus('success');
            })
    }, [trackId])


    return {
        detailQueryStatus,
        track
    }
}


export function TrackDetail(props: Props) {
    const {detailQueryStatus, track} = useTrackDetail(props.trackId);

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