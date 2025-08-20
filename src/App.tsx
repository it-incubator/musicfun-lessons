import {useEffect, useRef, useState} from "react";
import type {TrackDataItem, TrackResponse, TracksResponse} from "./types.ts";



export function App() {
    console.log('APP RENDERED')
    // Status of List of Query
    const [listQueryStatus, setListQueryStatus] = useState<'success' | 'loading'>('loading') // FSM
    const [tracks, setTracks] = useState<TrackDataItem[] | null>(null)

    const [detailQueryStatus, setDetailQueryStatus] = useState<'pending' | 'success' | 'loading'>('pending')
    const [selectedTrack, setSelectedTrack] = useState<TrackResponse | null>(null) // denormalization

    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)  // normalization
    const abortControllerRef = useRef<null | AbortController>(null) // denormalization

    useEffect(() => {
        // rest api
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'API-KEY': '08191417-56c8-418a-b93e-8ae881f38939'
            }
        })
            .then(res => res.json() as Promise<TracksResponse>)
            .then(json => {
                setTracks(json.data);
                setListQueryStatus('success')
            })
    }, [])

    const handleSelectTrackClick = (trackId: string) => {
        setSelectedTrackId(trackId);
        setDetailQueryStatus('loading');

        abortControllerRef.current?.abort()

        abortControllerRef.current = new AbortController();

        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + trackId, {
            signal: abortControllerRef.current.signal,
            headers: {
                'API-KEY': '08191417-56c8-418a-b93e-8ae881f38939'
            }
        })
            .then(res => res.json() as Promise<TrackResponse>)
            .then(json => {
                setSelectedTrack(json);
                setDetailQueryStatus('success');
            })

    }

    return (
        <div>
            <h1>Music Fun</h1>
            <div style={{'display': 'flex', 'gap': '20px'}}>
                <ul>
                    <h2>List</h2>
                    {
                        listQueryStatus === 'loading' && <p>Loading...</p>
                    }

                    { listQueryStatus === 'success' && tracks!.map((track) => {
                        const color = track.id === selectedTrackId ? 'red' : 'white'

                        return <li style={{color: color}}>
                            <h4 onClick={() => handleSelectTrackClick(track.id)}>{track.attributes.title}</h4>
                            <audio
                                src={track.attributes.attachments[0].url}
                                controls={true}
                            />
                        </li>
                    })}
                </ul>

                <div>
                    <h2>Detail</h2>
                    {detailQueryStatus === 'loading' && <p>Loading...</p>}

                    {detailQueryStatus === 'success' && selectedTrack && <div>
                        <h3>{selectedTrack.data.attributes.title}</h3>
                        <div>{selectedTrack.data.attributes.addedAt}</div>
                        <div>likes: {selectedTrack.data.attributes.likesCount}</div>
                        <div>lyrics: {selectedTrack.data.attributes.lyrics}</div>
                    </div>
                    }

                </div>
            </div>
        </div>
    )
}

