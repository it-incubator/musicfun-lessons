import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "../../../shared-layer/api-segment/client.ts";
import {authStorage} from "../../../shared-layer/libs-segment/authStorage.ts";
import {unwrap} from "./useMeQuery.tsx";

export const useLoginMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({login, password}: { login: string, password: string }) => {
            authStorage.saveBasicCredentials(login, password)
            return unwrap(client.GET('/auth/me'))
        },
        onError: () => {
            authStorage.removeBasicCredentials();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['auth']
            })
        }
    })
};

// ui -> bll -> dal