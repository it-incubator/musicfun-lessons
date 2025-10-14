import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {TracksList} from "./widgets-layer/tracks-slice/ui-segment/TracksList.tsx";
import {TrackDetail} from "./TrackDetail.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {AuthLayout} from "./layouts/AuthLayout.tsx";
import {CommonLayout} from "./layouts/CommonLayout.tsx";
import {GlobalLayout} from "./layouts/GlobalLayout.tsx";
import {Login} from "./pages-layer/Login.tsx";
import {Register} from "./pages-layer/Register.tsx";
import {NotFound} from "./pages-layer/NotFound.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: 60 * 1000
        }
    }
});
// @ts-expect-error we dont need typing
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<GlobalLayout />}>
                        <Route path={'auth'} element={<AuthLayout />}>
                            <Route path={'login'} element={<Login />} />
                            <Route path='register' element={<Register />} />
                        </Route>
                        <Route  element={<CommonLayout />}>
                            <Route path='/' element={<TracksList/>}/>
                            <Route path='/tracks/:trackId' element={<TrackDetail/>}/>
                        </Route>
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}


