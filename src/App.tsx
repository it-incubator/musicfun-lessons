import { QueryClientProvider } from "./query-client-context.tsx";
import { QueryClient } from "./query-client.ts";
import { MainPage } from "./MainPage.tsx";

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <MainPage />
        </QueryClientProvider>
    )
}