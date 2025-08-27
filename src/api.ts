import type {TrackResponse, TracksResponse} from "./types.ts";

export const api = {
    getTrack(trackId: string, abortController: AbortController | null = null) {
        return fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + trackId, {
            signal: abortController?.signal,
            headers: {
                'API-KEY': 'b0bd0c3e-7f61-4f7a-8105-bae0154b3b54'
            }
        })
            .then(res => res.json() as Promise<TrackResponse>)
    },
    getTracks() {
        return   fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'API-KEY': 'b0bd0c3e-7f61-4f7a-8105-bae0154b3b54'
            }
        })
            .then(res => res.json() as Promise<TracksResponse>)
    }


}