import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {TracksList} from "./TracksList.tsx";
import {TrackDetail} from "./TrackDetail.tsx";
// import {BrowserRouter, NavLink, Route} from "./shared/libs/router/Route.tsx";
import {BrowserRouter, NavLink, type NavLinkRenderProps, Route, Routes, useParams} from "react-router";
import {AuthLayout, GlobalLayout} from "./layouts/AuthLayout.tsx";
import {CommonLayout} from "./layouts/CommonLayout.tsx";
import styles from './App.module.css'

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

                <Routes>

                    <Route path={'/:lang?'} element={<GlobalLayout />}>
                        <Route path={'auth'} element={<AuthLayout />}>
                            {/*<Route path={'auth'}>*/}
                            <Route path={'login'} element={<Login />} />
                            <Route path='register' element={<Register />} />
                            <Route path='*' element={<AuthNotFound />} />
                        </Route>

                        <Route element={<CommonLayout />}>
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


const Login = () => {
    let {lang} = useParams();
    if (!lang) lang = 'ge'
    return <div>
        lang: {lang}
        <hr/>

        <input/><input/><button>Login</button></div>
}

const Register = () => {
    return <div><input/><input/><button>Register</button></div>
}

const AuthNotFound = () => {
    const params = useParams();
    return <h2>Not Found 404 {params['*']}</h2>
}

const NotFound = () => {
    return <h2>Not Found 404</h2>
}