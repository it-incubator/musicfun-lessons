import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/shared-layer/api-segment/client.ts";
import type {SchemaUpdatePlaylistRequestPayload} from "@/shared-layer/api-segment/schema.ts";

export const useUpdatePlaylistMutation = () => {
    const queryClient = useQueryClient()

    return  useMutation({
        mutationFn: async ({playlistId, payload}: {playlistId: string, payload: SchemaUpdatePlaylistRequestPayload}) =>
            client.PUT('/playlists/{playlistId}', {
                params: {
                    path: {
                         playlistId
                    }
                },
                body: payload
            }),
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['playlists', 'list']
            });
            await queryClient.invalidateQueries({
                queryKey: ['playlists', 'detail', variables.playlistId]
            });
        }
    })
};
