import {NavLink, type NavLinkRenderProps, Outlet, useParams, generatePath} from "react-router";
import styles from "../App.module.css";



export const AuthLayout = () => {
  return <div>
      <header>login or registration from layout</header>
      <Outlet />
      <footer>footer from layout</footer>
  </div>;
};

const renderClassName = ({ isActive }: NavLinkRenderProps) =>
    isActive ? styles.active : ""

const NavbarMenuItem = ({to, title}) => {
    return (
        <NavLink className={({ isActive }) =>
            isActive ? styles.active : ""} to={to}>{title}</NavLink>
    )
}

const renderNavbarMenuItem = (to, title) => {
    return (
        <NavLink className={({ isActive }) =>
            isActive ? styles.active : ""} to={to}>{title}</NavLink>
    )
}


export const GlobalLayout = () => {

    const params = useParams()
    let lang = params['lang']
    if (!lang) lang = 'ge'

    return <div>
        <header className={styles.header}>
            {/*<NavbarMenuItem to={'/'} title={'Main'}/>*/}
            {/*<NavbarMenuItem to={'/login'} title={'Login'}/>*/}
            {/*<NavbarMenuItem to={'/register'} title={'Register'}></NavbarMenuItem>*/}
            {renderNavbarMenuItem('/', 'Main')}
            {renderNavbarMenuItem(`/${lang}/auth/login`, 'Login')}
            {renderNavbarMenuItem(`/${lang}/auth/register`, 'Register')}
            <NavLink className={renderClassName} to={'/blabla'}>Blabla</NavLink>
        </header>
        <Outlet />
        <footer>footer from GLOBAL layout</footer>
    </div>;
};