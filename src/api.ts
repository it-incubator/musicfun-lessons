import type {TrackResponse, TracksResponse} from "./types.ts";

export const api = {
    async getTracks(): Promise<TracksResponse> {
        const res = await fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'API-KEY': 'e275daf5-7f7e-41f4-b738-57735d1e4362'
            }
        })
        const json = await res.json() as Promise<TracksResponse>
        return json
    },
    async getTrack(trackId: string, signal?: AbortSignal): Promise<TrackResponse> {
        const res = await fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + trackId, {
            signal: signal,
            headers: {
                'API-KEY': 'e275daf5-7f7e-41f4-b738-57735d1e4362'
            }
        })

        const json = await res.json() as Promise<TrackResponse>
        return json
    }
}