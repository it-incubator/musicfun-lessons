import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NavLink, Outlet, Route, Router, Routes} from "./shared/libs/router/mini-router.tsx";
import {MainPage} from "./MainPage.tsx";
import {TrackDetail} from "./TrackDetail.tsx";

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
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<MainPage />} />
                        <Route path="about" element={<About />} />
                        <Route path="detail/:trackId" element={<TrackDetail />} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

function Layout() {
    return (
        <div>
            <header>
                <nav style={{ display: "flex", gap: 12 }}>
                    <NavLink to="/" end activeStyle={{ textDecoration: "underline" }}>Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </header>
            <hr />
            <Outlet />
        </div>
    );
}

const About = () => <h2>About</h2>;