import styles from "../App.module.css";
import {NavLink, Outlet} from "react-router";
import {useMeQuery} from "../features-layer/auth-slice/model/useMeQuery.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {authStorage} from "../shared-layer/libs-segment/authStorage.ts";

const renderNavbarMenuItem = (to: string, title: string) => {
    return (
        <NavLink className={({isActive}) =>
            isActive ? styles.active : ""} to={to}>{title}</NavLink>
    )
}
export const GlobalLayout = () => {

    const { data, isLoading, isError, error } = useMeQuery();
    const queryClient = useQueryClient()

    const handleLogoutClick = () => {
        authStorage.removeBasicCredentials()
        queryClient.resetQueries({
            queryKey: ['auth']
        });
    }

    return <div>
        <header className={styles.header}>
            {renderNavbarMenuItem('/', 'Main')}
            {!data && !isLoading && renderNavbarMenuItem(`/auth/login`, 'Login')}
            {isError && renderNavbarMenuItem(`/auth/register`, 'Register')}
            {isError && <span>{JSON.stringify(error)}</span>}
            {data && renderNavbarMenuItem(`/profile/` + data.userId, data.login)}
            {data && <button onClick={handleLogoutClick}>Logout</button>}
        </header>
        <Outlet/>
        <footer>footer from GLOBAL layout</footer>
    </div>;
};