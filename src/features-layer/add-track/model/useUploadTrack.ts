import {useMutation} from "@tanstack/react-query";
import {client} from "../../../shared-layer/api-segment/client.ts";

type UploadTrackParams = {
    title: string;
    file: File;
};

export const useUploadTrack = () => {
    return useMutation({
        mutationFn: async (params: UploadTrackParams) => {
            const response = await client.POST('/playlists/tracks/upload', {
                body: {
                    title: params.title,
                    file: params.file as unknown as string, // openapi-fetch expects string for binary
                },
                bodySerializer: (body) => {
                    const formData = new FormData();
                    formData.append('title', body.title);
                    formData.append('file', body.file as unknown as File);
                    return formData;
                }
            });

            if (response.error) {
                throw new Error('Failed to upload track');
            }

            return response.data;
        }
    });
};