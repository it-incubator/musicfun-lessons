import {useEffect, useRef, useState} from "react";
import type {TrackDataItem, TrackResponse, TracksResponse} from "./types.ts";


export function App() {
    console.log('APP RENDERED')
    const [isListLoading, setIsListLoading] = useState<boolean>(true)
    const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false)
    const [tracks, setTracks] = useState<TrackDataItem[]>([])
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)  // normalization

    const [selectedTrack, setSelectedTrack] = useState<TrackResponse | null>(null) // denormalization
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
                setIsListLoading(false)
            })
    }, [])

    const handleSelectTrackClick = (trackId: string) => {
        setSelectedTrackId(trackId);
        setIsDetailLoading(true);

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
                setIsDetailLoading(false);
            })

    }

    return (
        <div>
            <h1>Music Fun</h1>
            <div style={{'display': 'flex', 'gap': '20px'}}>
                <ul>
                    <h2>List</h2>
                    {
                        isListLoading && <p>Loading...</p>
                    }

                    {tracks.map((track) => {
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
                    {isDetailLoading && <p>Loading...</p>}

                    {!isDetailLoading && selectedTrack && <div>
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

