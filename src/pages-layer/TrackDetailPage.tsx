import {TrackDetail} from "../TrackDetail.tsx";
import {useParams} from "react-router";

export const TrackDetailPage = () => {
    const {trackId} = useParams();

    return <div>
        <TrackDetail trackId={trackId!}/>
    </div>;
};