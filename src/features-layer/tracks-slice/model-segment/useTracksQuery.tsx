import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {client} from "../../../shared-layer/api-segment/client.ts";
import type {SchemaGetTracksRequestPayload} from "../../../shared-layer/api-segment/schema.ts";

export function useTracksQuery(params: Partial<SchemaGetTracksRequestPayload>) {
    return useQuery({
        queryFn: async () => {
            const clientData = await client.GET('/playlists/tracks', {
                params: {
                    query: params
                }
            })
            return clientData.data!
        },
        queryKey: ['tracks', 'list', params],
        placeholderData: keepPreviousData
    });
}