import {useQuery} from "@tanstack/react-query";
import {unwrap} from "../../../features-layer/auth-slice/model/useMeQuery.tsx";
import {client} from "../../../shared-layer/api-segment/client.ts";

export const usePlaylists = (userId?: string) => {
    return useQuery({
        queryKey: ['playlists', userId],
        queryFn: () => unwrap(client.GET('/playlists', {
            params: {
                query: {
                    userId
                }
            }
        }))
    })
}