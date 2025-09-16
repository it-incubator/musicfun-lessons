import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {client} from "./shared/api/client.ts";

type Props = {
    trackId: string | null
}

export function TrackDetail(props: Props) {
    console.log('TrackDetail')
    const {data, isPending, isError, isFetching} = useQuery({
        queryFn: async ({signal}) => {
            const clientData = await  client.GET('/playlists/tracks/{trackId}', {
                params: {
                    path: {
                        trackId: props.trackId!
                    }
                },
                signal: signal
            });
            return clientData.data!
        },
        enabled: Boolean(props.trackId),
        queryKey: ['tracks', 'detail', props.trackId],
        placeholderData: keepPreviousData
    })

    if (!props.trackId) {
        return <div>no track selected</div>
    }

    if (isPending) {
        return <div>fetching...</div>
    }

    if (isError) {return <span>some error when fetch track</span>}


    return  <div>
        <h2>Detail {isFetching && '⏳'}</h2>
            <h3>{data.data.attributes.title}</h3>
            <div>{data.data.attributes.addedAt}</div>
            <div>likes: {data.data.attributes.likesCount}</div>
            <div>lyrics: {data.data.attributes.lyrics}</div>
    </div>
}
