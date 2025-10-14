import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {client} from "./shared-layer/api-segment/client.ts";

type Props = {
    trackId: string;
}

export function TrackDetail({trackId}: Props) {

    const {data, isPending, isError, isFetching} = useQuery({
        queryFn: async ({signal}) => {
            const clientData = await  client.GET('/playlists/tracks/{trackId}', {
                params: {
                    path: {
                        trackId:
                            trackId!
                    }
                },
                signal: signal
            });
            return clientData.data!
        },
        enabled: Boolean(trackId),
        queryKey: ['tracks', 'detail', trackId],
        placeholderData: keepPreviousData
    })

    if (!trackId) {
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
