import styles from "../App.module.css";
import {NavLink, Outlet} from "react-router";
import {useMeQuery} from "../features-layer/auth-slice/model/useMeQuery.tsx";

const renderNavbarMenuItem = (to: string, title: string) => {
    return (
        <NavLink className={({isActive}) =>
            isActive ? styles.active : ""} to={to}>{title}</NavLink>
    )
}
export const GlobalLayout = () => {

    const { data, isLoading, isError, error } = useMeQuery();

    return <div>
        <header className={styles.header}>
            {renderNavbarMenuItem('/', 'Main')}
            {!data && !isLoading && renderNavbarMenuItem(`/auth/login`, 'Login')}
            {isError && renderNavbarMenuItem(`/auth/register`, 'Register')}
            {isError && <span>{JSON.stringify(error)}</span>}
            {data && renderNavbarMenuItem(`/profile/` + data.userId, data.login)}
        </header>
        <Outlet/>
        <footer>footer from GLOBAL layout</footer>
    </div>;
};