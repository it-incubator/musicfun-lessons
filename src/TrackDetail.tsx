import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {client} from "./shared/api/client.ts";
import {useParams} from "./shared/libs/router/mini-router.tsx";

type Props = {
    //trackId: string | null
}

export function TrackDetail(props: Props) {
    console.log('TrackDetail')
    const params = useParams();

    const {data, isPending, isError, isFetching} = useQuery({
        queryFn: async ({signal}) => {
            const clientData = await  client.GET('/playlists/tracks/{trackId}', {
                params: {
                    path: {
                        trackId: params.trackId!
                    }
                },
                signal: signal
            });
            return clientData.data!
        },
        enabled: Boolean(params.trackId),
        queryKey: ['tracks', 'detail', params.trackId],
        placeholderData: keepPreviousData
    })

    if (!params.trackId) {
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
