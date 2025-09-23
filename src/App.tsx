import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {TracksList} from "./TracksList.tsx";
import {TrackDetail} from "./TrackDetail.tsx";
import {BrowserRouter, NavLink, Route} from "./shared/libs/router/Route.tsx";
import {useState} from "react";

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
    // const [c, setC] = useState(0)
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {/*<button onClick={() => setC(c + 1)}>refresh</button>*/}
                <header>
                    <NavLink to={'/'}>Main</NavLink>
                </header>
                <Route path='/' element={<TracksList/>}/>
                <Route path='/tracks/:trackId' element={<TrackDetail/>}/>
            </BrowserRouter>
        </QueryClientProvider>
    )
}