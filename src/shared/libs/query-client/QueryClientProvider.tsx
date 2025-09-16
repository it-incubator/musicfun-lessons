import {type PropsWithChildren} from "react";
import type {QueryClient} from "./query-client.ts";
import {QueryClientContext} from "./QueryClientContext.tsx";

type Props = {
    client: QueryClient
}
export const QueryClientProvider = ({client, children}: PropsWithChildren<Props>) => {
    return (
        <QueryClientContext value={client}>
            {children}
        </QueryClientContext>
    )
}