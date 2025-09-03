import {TracksList} from "./TracksList.tsx";
import {TrackDetail} from "./TrackDetail.tsx";
import {useState} from "react";

function useApp() {
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)

    return {
        selectedTrackId,
        setSelectedTrackId
    }
}

export const App = () => {
    const {setSelectedTrackId, selectedTrackId} = useApp()

    return (
        <div>
            <button onClick={() => setSelectedTrackId(null)}>Reset</button>
            <div style={{'display': 'flex', 'gap': '20px'}}>
                <TracksList
                    selectedTrackId={selectedTrackId}
                    onTrackSelect={(trackId) => {
                    setSelectedTrackId(trackId)
                }}/>
                <TrackDetail trackId={selectedTrackId}/>
            </div>
        </div>
    )
}