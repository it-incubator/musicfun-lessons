import {TracksList} from "../widget-layer/tracks-slice/ui-segment/TracksList.tsx";
import {useParams} from "react-router";
import {UploadTrackForm} from "../features-layer/add-track/ui/UploadTrackForm.tsx";

export const Profile = () => {
    const userId = useParams()['userId']



    return <>
        <UploadTrackForm />
        <TracksList userId={userId} />
        </>
}