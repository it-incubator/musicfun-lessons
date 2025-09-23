import {useState} from "react";
import {TracksList} from "./TracksList.tsx";
import {TrackDetail} from "./TrackDetail.tsx";

export const MainPage = () => {
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)

    return (
        <div>
            <button onClick={() => {
                setSelectedTrackId(null);
            }}>Reset</button>
            <div style={{'display': 'flex', 'gap': '20px'}}>

                <TracksList
                    selectedTrackId={selectedTrackId}
                    onTrackSelect={(trackId) => {
                        setSelectedTrackId(trackId)
                    }}/>
                <TrackDetail trackId={selectedTrackId}/>

                {/*{isDublicationDetailVisible && <TrackDetail trackId={selectedTrackId}/> }*/}
            </div>
        </div>
    )
}