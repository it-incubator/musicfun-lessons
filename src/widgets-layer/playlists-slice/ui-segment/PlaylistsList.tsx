import {usePlaylists} from "../model-segment/usePlaylists.tsx";
import noCoverPlaceholder from '@/assets/no-cover.png'
import type {SchemaPlaylistListItemJsonApiData} from "@/shared-layer/api-segment/schema.ts";
type Props = {
    userId?: string | undefined
}

export const PlaylistsList = ({userId}: Props) => {

    const {data, isLoading, isError} = usePlaylists(userId)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Some error... <button>try again</button> </div>

    return <div>Playlists {userId}
        <div>
            {data?.data.map(p => <div key={p.id}>
               <h4>{p.attributes.title}</h4>
                <PlaylistCover playlist={p} />
            </div>)}
        </div>
    </div>
}

// todo: точнго нам нужно в какой-то мелкий Cover компонент передавать ТАК МНОГО ДАННЫХ о плейлисте?
const PlaylistCover = ({playlist}: { playlist: SchemaPlaylistListItemJsonApiData }) => {
    let url = noCoverPlaceholder;

    if (playlist.attributes.images.main?.length) {
        url = playlist.attributes.images.main[0]!.url;
    }

    return <img src={url} alt="" style={{ width: '200px'}}/>
}