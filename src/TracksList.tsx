import {Track} from "./Track.tsx";
import * as React from "react";
import {useQuery} from "./useQuery.ts";
import {api} from "./api.ts";

type Props = {
    onTrackSelect: (trackId: string) => void
    selectedTrackId: string | null
}

export function TracksList(props: Props) {

    const {data, status} = useQuery({
        queryFn: () => api.getTracks(),
        queryKey: ['tracks']
    })


    if (status === 'loading') {
        return <div>loading...</div>
    }

    const handleSelect = (trackId: string) => {
        // setSelectedTrackId(trackId)
        props.onTrackSelect(trackId)
    }

    return <ul>
        {data?.data.map(t => {
            return <Track key={t.id}
                onSelect={ handleSelect }
                isSelected={t.id === props.selectedTrackId}
                track={t}
            />;
        })
        }
    </ul>;
}