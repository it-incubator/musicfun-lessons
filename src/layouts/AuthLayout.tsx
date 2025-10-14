import {NavLink, Outlet} from "react-router";
import styles from "../App.module.css";
import {useQuery} from "@tanstack/react-query";
import {client} from "../shared-layer/api-segment/client.ts";


export const AuthLayout = () => {
  return <div>
      <header>login or registration from layout</header>
      <Outlet />
      <footer>footer from layout</footer>
  </div>;
};

const renderNavbarMenuItem = (to: string, title: string) => {
    return (
        <NavLink className={({ isActive }) =>
            isActive ? styles.active : ""} to={to}>{title}</NavLink>
    )
}


export const GlobalLayout = () => {
    const { data: meData, isLoading} = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const resp = await client.GET('/auth/me')
            return resp.data
        }
    })

    return <div>
        <header className={styles.header}>
            {renderNavbarMenuItem('/', 'Main')}
            {!isLoading && !meData && renderNavbarMenuItem(`/auth/login`, 'Login')}
            {!isLoading && !meData && renderNavbarMenuItem(`/auth/register`, 'Register')}
            {meData && renderNavbarMenuItem(`/profile/` + meData.userId, meData.login)}
        </header>
        <Outlet />
        <footer>footer from GLOBAL layout</footer>
    </div>;
};