import {useEffect, useState} from "react";
import type {TrackDataItem, TracksResponse} from "./types.ts";


export function App() {
    const [tracks, setTracks] = useState<TrackDataItem[]>([])

    useEffect(() => {
        // rest api
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                //'API-KEY': '08191417-56c8-418a-b93e-8ae881f38939'
            }
        })
            .then(res => res.json() as Promise<TracksResponse> )
            .then(json => {
                console.log(json)
                setTracks(json.data);
            })
    }, [])

    return (
        <div>
            <h1>Music Fun</h1>
            <ul>
                {tracks.map((track) => {
                    return <li>
                        <h4>{track.attributes.title}</h4>
                        <audio
                            src={track.attributes.attachments[0].url}
                            controls={true}
                        />
                    </li>
                })}
            </ul>
        </div>
    )
}

