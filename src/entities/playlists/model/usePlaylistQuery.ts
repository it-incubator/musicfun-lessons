import {useQuery} from "@tanstack/react-query";
import {unwrap} from "@/features-layer/auth-slice/model/useMeQuery.tsx";
import {client} from "@/shared-layer/api-segment/client.ts";

export const usePlaylistQuery = (playlistId: string) => {
    return useQuery({
        queryKey: ['playlists', 'detail', playlistId],
        queryFn: () => unwrap(
            client.GET('/playlists/{playlistId}',
                {
                    params: {
                        path: {
                            playlistId: playlistId,
                        }
                    }
                }))
    })
}