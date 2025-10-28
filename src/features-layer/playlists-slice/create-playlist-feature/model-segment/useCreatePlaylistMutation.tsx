import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/shared-layer/api-segment/client.ts";

export const useCreatePlaylistMutation = () => {
    const queryClient = useQueryClient()

    return  useMutation({
        mutationFn: async ({title, description}:{title: string, description: string}) =>
            client.POST('/playlists', {
                body: {
                    title: title,
                    description: description
                }
            }),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['playlists', 'list']
            });
        }
    })
};
