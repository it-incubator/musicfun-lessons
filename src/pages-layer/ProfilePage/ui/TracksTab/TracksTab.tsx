import {UploadTrackForm} from "@/features-layer/tracks-slice/upload-track-feature/ui-segment/UploadTrackForm.tsx";
import {TracksList} from "@/widgets-layer/tracks-slice/ui-segment/TracksList.tsx";

export const TracksTab = ({isProfileOwner, userId}: { isProfileOwner: boolean, userId?: string }) => {
    return <>
        {isProfileOwner && <UploadTrackForm/>}
        <TracksList userId={userId} includeDrafts={isProfileOwner}/>
    </>;
}