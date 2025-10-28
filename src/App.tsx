import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router";
import {AuthLayout} from "./layouts/AuthLayout.tsx";
import {CommonLayout} from "./layouts/CommonLayout.tsx";
import {GlobalLayout} from "./layouts/GlobalLayout.tsx";
import {LoginPage} from "./pages-layer/LoginPage.tsx";
import {RegisterPage} from "./pages-layer/RegisterPage.tsx";
import {NotFoundPage} from "./pages-layer/NotFoundPage.tsx";
import {ProfilePage} from "./pages-layer/ProfilePage";
import {TrackDetailPage} from "./pages-layer/TrackDetailPage.tsx";
import {TracksListPage} from "./pages-layer/TracksListPage.tsx";

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
                            <Route path={'login'} element={<LoginPage />} />
                            <Route path='register' element={<RegisterPage />} />
                        </Route>
                        <Route  element={<CommonLayout />}>
                            <Route path='/' element={<TracksListPage/>}/>
                            <Route path='/tracks/:trackId' element={<TrackDetailPage/>}/>
                            <Route path='/profile/:userId' element={<ProfilePage/>}/>
                        </Route>
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}


