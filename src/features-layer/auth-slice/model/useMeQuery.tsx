import {useQuery} from "@tanstack/react-query";
import {client} from "../../../shared-layer/api-segment/client.ts";

export const useMeQuery = () => {
    return useQuery({
        queryKey: ['auth', 'me'],
        queryFn: () => unwrap(client.GET('/auth/me')),
        retry: false,
    });
}


export type ExtractData<T> = T extends { data?: infer D } ? NonNullable<D> : never

export async function unwrap<P extends Promise<{ data?: unknown; error?: unknown }>>(
    promise: P
): Promise<ExtractData<Awaited<P>>> {
    const res = (await promise) as Awaited<P>
    return (res as { data: ExtractData<Awaited<P>> }).data
}
