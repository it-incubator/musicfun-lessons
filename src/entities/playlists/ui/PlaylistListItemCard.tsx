import {
    DeletePlaylistButton
} from "@/features-layer/playlists-slice/delete-playlist-feature/ui-segment/DeletePlaylistButton.tsx";
import type {SchemaPlaylistListItemJsonApiData} from "@/shared-layer/api-segment/schema.ts";
import {PlaylistCover} from "@/entities/playlists/ui/PlaylistCover.tsx";
import {useMeQuery} from "@/features-layer/auth-slice/model/useMeQuery.tsx";
import {
    UploadPlaylistCoverForm
} from "@/features-layer/playlists-slice/upload-playlists-cover-feature/ui-segment/UploadPlaylistCoverForm.tsx";
import {useState} from "react";
import {
    UpdatePlaylistForm
} from "@/features-layer/playlists-slice/update-playlist-feature/ui-segment/UpdatePlaylistForm.tsx";

export const PlaylistListItemCard = ({playlist}: { playlist: SchemaPlaylistListItemJsonApiData }) => {
    const {data: meData} = useMeQuery()

    const isPlaylistOwner = meData && playlist.attributes.user.id === meData.userId;

    const [mode, setMode] = useState<'display' | 'edit'>('display')

    if (!isPlaylistOwner && mode === 'edit') throw new Error('You are not allowed to edit this playlist')

    if (mode === 'display') return <div>
        { isPlaylistOwner && <button onClick={() => setMode('edit')}>✏️</button> }
        <DisplayMode playlist={playlist}/>
        </div>

    if (mode === 'edit') return <div>
        <button onClick={() => setMode('display')}>❌️</button>
        <EditMode playlist={playlist}/>
    </div>
}

const DisplayMode = ({playlist}: { playlist: SchemaPlaylistListItemJsonApiData }) => {
    return <div>
        <h4>{playlist.attributes.title}  </h4>
        <PlaylistCover images={playlist.attributes.images} playlistTitle={playlist.attributes.title}/>
    </div>
}

const EditMode = ({playlist}: { playlist: SchemaPlaylistListItemJsonApiData }) => {
    return <div>
        <UpdatePlaylistForm  playlistId={playlist.id} />
        <div><DeletePlaylistButton playlistId={playlist.id}/></div>
        <div><UploadPlaylistCoverForm playlistId={playlist.id}/></div>
        <PlaylistCover images={playlist.attributes.images} playlistTitle={playlist.attributes.title}/>
    </div>
}