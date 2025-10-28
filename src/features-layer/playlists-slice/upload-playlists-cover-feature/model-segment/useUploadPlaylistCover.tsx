import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/shared-layer/api-segment/client.ts";

export const useUploadPlaylistCover = () => {
    const queryClient = useQueryClient()

    return  useMutation({
        mutationFn: async ({playlistId, file}:{playlistId: string, file: File}) =>
            client.POST('/playlists/{playlistId}/images/main', {
                params: {
                    path: {
                        playlistId: playlistId
                    }
                },
                body: {
                    file: file as unknown as string,
                },
                bodySerializer: (body) => {
                    const formData = new FormData();
                    formData.append('file', body.file);
                    return formData;
                }
            }),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['playlists']
            });
        }
    })
};
