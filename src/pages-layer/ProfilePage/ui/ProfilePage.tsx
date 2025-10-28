import {useParams} from "react-router";
import {useMeQuery} from "../../../features-layer/auth-slice/model/useMeQuery.tsx";
import {useState} from "react";
import {TracksTab} from "@/pages-layer/ProfilePage/ui/TracksTab/TracksTab.tsx";
import {PlaylistsTab} from "@/pages-layer/ProfilePage/ui/PlaylistsTab/PlaylistsTab.tsx";

export const ProfilePage = () => {
    const {userId} = useParams();

    const {data} = useMeQuery()

    const isProfileOwner = data?.userId === userId;

     const [currentTab, setCurrentTab] = useState<'tracks' | 'playlists'>('playlists')


    return <div>
        <button onClick={() => setCurrentTab('tracks')}>Tracks</button>

        <button onClick={() => setCurrentTab('playlists')}>Playlists</button>

        { currentTab === 'tracks' && <TracksTab
            isProfileOwner={isProfileOwner}
            userId={userId} />}

        { currentTab === 'playlists' && <PlaylistsTab
            isProfileOwner={isProfileOwner}
            userId={userId} />}


    </div>
}

