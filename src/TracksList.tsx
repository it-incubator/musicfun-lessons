import {TrackItem} from "./TrackItem.tsx";
import {useEffect, useState} from "react";
import type {TrackDataItem} from "./types.ts";
import {api} from "./api.ts";

type Props = {
    onTrackSelected: (trackId: string) => void
}

export const TracksList = (props: Props) => {
    const [listQueryStatus, setListQueryStatus] = useState<'success' | 'loading'>('loading') // FSM
    const [tracks, setTracks] = useState<TrackDataItem[] | null>(null)

    useEffect(() => {
        // rest api
        api.getTracks().then(json => {
            setTracks(json.data);
            setListQueryStatus('success')
        })
    }, [])

    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)  // normalization


    const handleSelectTrackClick = (trackId: string) => {
        setSelectedTrackId(trackId);
        props.onTrackSelected(trackId)
    }

    return  <ul>
      <h2>List</h2>
      {
          listQueryStatus === 'loading' && <p>Loading...</p>
      }

      {listQueryStatus === 'success' && tracks!.map((track) => {
          return <TrackItem key={track.id} track={track} selectedTrackId={selectedTrackId}
                            handleSelectTrackClick={handleSelectTrackClick}/>
      })}
  </ul>
};