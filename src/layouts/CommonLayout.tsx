import {Outlet} from "react-router";

export const CommonLayout = () => {
    return <div>
        <header><h1>Welcome to our service</h1></header>
        <Outlet />
        <footer style={{backgroundColor: "yellow"}}>footer from COMMON layout</footer>
    </div>;
};