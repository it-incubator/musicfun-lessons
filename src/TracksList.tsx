import {Track} from "./Track.tsx";
import {useQuery} from "@tanstack/react-query";
import {client} from "./shared/api/client.ts";
import {useSearchParams} from "react-router";


export function TracksList() {

    let [searchParams] = useSearchParams();



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
        return <div>
            sort by {searchParams.get('sort')}
            <hr/>
            Can't load tracks list</div>
    }

    return <ul>
        {data.data.map(t => {
            return <Track key={t.id} track={t}
            />;
        })
        }
    </ul>;
}