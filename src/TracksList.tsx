import {Track} from "./Track.tsx";
import * as React from "react";
import {useState} from "react";
import type {TrackDataItem} from "./types.ts";
import {api} from "./api.ts";

type Props = {
    onTrackSelect: (trackId: string) => void
    selectedTrackId: string | null
}

export function TracksList(props: Props) {
    const [listQueryStatus, setListQueryStatus] = useState<'pending' | 'success' | 'loading'>('loading') // FSM
    const [tracks, setTracks] = useState<TrackDataItem[] | null>(null)
    //const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)

    React.useEffect(() => {
        // rest api
        api.getTracks()
            .then(json => {
                setTracks(json.data);
                setListQueryStatus('success')
            })
    }, [])

    if (listQueryStatus === 'loading') {
        return <div>loading...</div>
    }

    const handleSelect = (trackId: string) => {
        // setSelectedTrackId(trackId)
        props.onTrackSelect(trackId)
    }

    return <ul>
        {tracks?.map(t => {
            return <Track
                onSelect={ handleSelect }
                isSelected={t.id === props.selectedTrackId}
                track={t}
            />;
        })
        }
    </ul>;
}