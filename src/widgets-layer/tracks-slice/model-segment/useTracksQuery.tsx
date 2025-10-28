import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {client} from "../../../shared-layer/api-segment/client.ts";
import type {SchemaGetTracksRequestPayload} from "../../../shared-layer/api-segment/schema.ts";
import {unwrap} from "../../../features-layer/auth-slice/model/useMeQuery.tsx";

export function useTracksQuery(params: Partial<SchemaGetTracksRequestPayload>) {
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