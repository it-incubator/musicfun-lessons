import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "../../../../shared-layer/api-segment/client.ts";

export const useUploadTrack = () => {
    const queryClient = useQueryClient()

    return  useMutation({
        mutationFn: async ({title, file}:{title: string, file: File}) => {
            const wrapper = await  client.POST('/playlists/tracks/upload', {
                body: {
                    title: title,
                    file: file as unknown as string,
                },
                bodySerializer: (body) => {
                    const formData = new FormData();
                    formData.append('title', body.title);
                    formData.append('file', body.file);
                    return formData;
                }
            })
            if (wrapper.error) throw wrapper.error
            return wrapper.data
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['tracks', 'list']
            });
        }
    })
};
