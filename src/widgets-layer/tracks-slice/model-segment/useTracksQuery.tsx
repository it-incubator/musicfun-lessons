import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {client} from "@/shared-layer/api-segment/client.ts";
import type {SchemaGetTracksRequestPayload} from "@/shared-layer/api-segment/schema.ts";
import {unwrap} from "@/features-layer/auth-slice/model/useMeQuery.tsx";
import type {Strict} from "@/shared-layer/utils/types/strict.tsx";

type TracksParams =  Partial<SchemaGetTracksRequestPayload>

export function useTracksQuery<P extends TracksParams>(params: Strict<TracksParams, P>) {
    return useQuery({
        queryFn: () => unwrap(client.GET('/playlists/tracks', {
            params: {
                query: params
            }
        })),
        queryKey: ['tracks', 'list', params],
        placeholderData: keepPreviousData
    });
}