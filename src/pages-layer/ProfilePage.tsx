import {TracksList} from "../widgets-layer/tracks-slice/ui-segment/TracksList.tsx";
import {useParams} from "react-router";
import {useMeQuery} from "../features-layer/auth-slice/model/useMeQuery.tsx";
import {UploadTrackForm} from "../features-layer/tracks-slice/upload-track-feature/ui-segment/UploadTrackForm.tsx";
import {useState} from "react";
import {PlaylistsList} from "../widgets-layer/playlists-slice/ui-segment/PlaylistsList.tsx";

export const ProfilePage = () => {
    const {userId} = useParams();

    const {data} = useMeQuery()

    const isProfileOwner = data?.userId === userId;

     const [currentTab, setCurrentTab] = useState<'tracks' | 'playlists'>('playlists')

    return <div>
        <button onClick={() => setCurrentTab('tracks')}>Tracks</button>

        <button onClick={() => setCurrentTab('playlists')}>Playlists</button>

        { currentTab === 'tracks' && <>
            {isProfileOwner && <UploadTrackForm/>}
            <TracksList userId={userId} includeDrafts={isProfileOwner}/>
        </>}

        { currentTab === 'playlists' && <>
            <PlaylistsList userId={userId} />
        </>}


    </div>
}