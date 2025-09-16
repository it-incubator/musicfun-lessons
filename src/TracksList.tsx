import {Track} from "./Track.tsx";
import {useQuery} from "@tanstack/react-query";
import {client} from "./shared/api/client.ts";

type Props = {
    onTrackSelect: (trackId: string) => void
    selectedTrackId: string | null,
}

export function TracksList(props: Props) {

    const {data, isPending, isError} = useQuery({
        queryFn: async () => {
            const clientData = await client.GET('/playlists/tracks')
            return clientData.data!
        },
        queryKey: ['tracks', 'list']
    })


    if (isPending) {
        return <div>loading...</div>
    }

    if (isError) {
        return <div>Can't load tracks list</div>
    }

    const handleSelect = (trackId: string) => {
        // setSelectedTrackId(trackId)
        props.onTrackSelect(trackId)
    }

    return <ul>
        {data.data.map(t => {
            return <Track key={t.id}
                          onSelect={handleSelect}
                          isSelected={t.id === props.selectedTrackId}
                          track={t}
            />;
        })
        }
    </ul>;
}