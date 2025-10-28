import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/shared-layer/api-segment/client.ts";
import {unwrap} from "@/features-layer/auth-slice/model/useMeQuery.tsx";

export const useDeletePlaylistMutation = () => {
    const queryClient = useQueryClient()

    return  useMutation({
        mutationFn: async ({playlistId}:{playlistId: string}) =>
            unwrap(client.DELETE('/playlists/{playlistId}', {
                params: {
                    path: {
                        playlistId: playlistId
                    }
                }
            })),
        onSuccess: async () => {
            // если не await? то мутация будет считаться завершенной сразу
            // а если await, то только тогда, когда промис из invalidateQueries  зарезолвится.
            // а он зарезолвится когда  client обновит все кеши
            await queryClient.invalidateQueries({
                queryKey: ['playlists']
            });
        }
    })
};