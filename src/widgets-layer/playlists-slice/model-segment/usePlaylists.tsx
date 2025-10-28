import {useQuery} from "@tanstack/react-query";
import {unwrap} from "../../../features-layer/auth-slice/model/useMeQuery.tsx";
import {client} from "../../../shared-layer/api-segment/client.ts";
import type {SchemaGetPlaylistsRequestPayload} from "@/shared-layer/api-segment/schema.ts";
import type {Strict} from "@/shared-layer/utils/types/strict.tsx";

type PlaylistsParams = Partial<SchemaGetPlaylistsRequestPayload>;

export function usePlaylists<P extends PlaylistsParams>(
    params: Strict<PlaylistsParams, P>   // ← здесь проверяем “без лишних ключей”
) {
    return useQuery({
        queryKey: ['playlists', 'list', params] as const,
        queryFn: () =>
            unwrap(client.GET('/playlists', { params: { query: params } }))
    });
}