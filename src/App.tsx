import {useState} from "react";
import {TrackDetail} from "./TrackDetail.tsx";
import {TracksList} from "./TracksList.tsx";

export function App() {
    console.log('APP RENDERED')
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)

    const handleSelectTrackClick = (trackId: string) => {
        setSelectedTrackId(trackId)
    }

    return (
        <div>
            <h1>Music Fun</h1>
            <div style={{'display': 'flex', 'gap': '20px'}}>
                <TracksList onTrackSelected={handleSelectTrackClick} />

                <TrackDetail  trackId={selectedTrackId} />
            </div>
        </div>
    )
}

