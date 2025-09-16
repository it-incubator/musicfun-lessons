import {MainPage} from "./MainPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: 10 * 1000
        }
    }
});
// @ts-expect-error we dont need typing
window.__TANSTACK_QUERY_CLIENT__ = queryClient;


export const App = () => {
   return (
       <QueryClientProvider client={queryClient}>
         <MainPage />
       </QueryClientProvider>
   )
}