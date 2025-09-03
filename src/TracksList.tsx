import {Track} from "./Track.tsx";
import * as React from "react";
import type {TrackDataItem} from "./types.ts";
import {api} from "./api.ts";
import {useQuery} from "./hooks/utils/useQuery.ts";

type Props = {
    onTrackSelect: (trackId: string) => void
    selectedTrackId: string | null
}

function useTracksList(onTrackSelect: (trackId: string) => void) {
    const {
        queryStatus: listQueryStatus,
        setQueryStatus: setListQueryStatus,
        data: tracks,
        setData: setTracks
    } = useQuery<TrackDataItem[]>() // FSM

    React.useEffect(() => {
        // rest api
        api.getTracks()
            .then(json => {
                setTracks(json.data);
                setListQueryStatus('success')
            })
    }, [])

    const handleSelect = (trackId: string) => {
        // setSelectedTrackId(trackId)
        onTrackSelect(trackId)
    }

    return {
        handleSelect,
        listQueryStatus,
        tracks
    }
}

// GRASP: high cohesion / low coupling
export function TracksList(props: Props) {
    const {
        handleSelect,
        listQueryStatus,
        tracks
    } = useTracksList(props.onTrackSelect);


    if (listQueryStatus === 'loading') {
        return <div>loading...</div>
    }


    return <ul>
        {tracks?.map(t => {
            return <Track
                onSelect={handleSelect}
                isSelected={t.id === props.selectedTrackId}
                track={t}
            />;
        })
        }
    </ul>;
}