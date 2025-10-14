import styles from "../App.module.css";
import {NavLink, Outlet} from "react-router";

const renderNavbarMenuItem = (to: string, title: string) => {
    return (
        <NavLink className={({isActive}) =>
            isActive ? styles.active : ""} to={to}>{title}</NavLink>
    )
}
export const GlobalLayout = () => {
    return <div>
        <header className={styles.header}>
            {renderNavbarMenuItem('/', 'Main')}
            {renderNavbarMenuItem(`/auth/login`, 'Login')}
            {renderNavbarMenuItem(`/auth/register`, 'Register')}
        </header>
        <Outlet/>
        <footer>footer from GLOBAL layout</footer>
    </div>;
};