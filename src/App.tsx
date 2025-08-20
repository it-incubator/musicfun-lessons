import {useEffect, useState} from "react";
import type {TrackDataItem, TrackResponse, TracksResponse} from "./types.ts";


export function App() {
    console.log('APP RENDERED')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tracks, setTracks] = useState<TrackDataItem[]>([])
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)  // normalization

    const [selectedTrack, setSelectedTrack] = useState<TrackResponse | null>(null) // denormalization

    // const selectedTrack = tracks.find(/*predicate*/(t) => t.id === selectedTrackId) // O(n) Normalization

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
                setIsLoading(false)
            })
    }, [])


    useEffect(() => {
        if (!selectedTrackId) return;

        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + selectedTrackId, {
            headers: {
                'API-KEY': '08191417-56c8-418a-b93e-8ae881f38939'
            }
        })
            .then(res => res.json() as Promise<TrackResponse>)
            .then(json => {
                setSelectedTrack(json);
            })
    }, [selectedTrackId])

    return (
        <div>
            <h1>Music Fun</h1>
            <div style={{'display': 'flex', 'gap': '20px'}}>
                <ul>
                    <h2>List</h2>
                    {
                        isLoading && <p>Loading...</p>
                    }

                    {tracks.map((track) => {
                        const color = track.id === selectedTrackId ? 'red' : 'white'

                        return <li style={{color: color}}>
                            <h4 onClick={() => {
                                setSelectedTrackId(track.id);
                            }}>{track.attributes.title}</h4>
                            <audio
                                src={track.attributes.attachments[0].url}
                                controls={true}
                            />
                        </li>
                    })}
                </ul>

                <div>
                    <h2>Detail</h2>
                    {  selectedTrack && <div>
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

