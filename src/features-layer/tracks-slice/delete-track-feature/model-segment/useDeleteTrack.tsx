import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "../../../../shared-layer/api-segment/client.ts";

export const useDeleteTrackMutation = () => {
    const queryClient = useQueryClient()

    return  useMutation({
        mutationFn: async ({trackId}:{trackId: string}) => {
            const wrapper = await  client.DELETE('/playlists/tracks/{trackId}', {
              params: {
                  path: {
                      trackId: trackId
                  }
              }
            })
            if (wrapper.error) throw wrapper.error
            return wrapper.data
        },
        onSuccess: async () => {
            // если не await? то мутация будет считаться завершенной сразу
            // а если await, то только тогда, когда промис из invalidateQueries  зарезолвится.
            // а он зарезолвится когда  client обновит все кеши
            await queryClient.invalidateQueries({
                queryKey: ['tracks']
            });
        }
    })
};