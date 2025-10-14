import {Outlet} from "react-router";

export const AuthLayout = () => {
  return <div>
      <header>login or registration from layout</header>
      <Outlet />
      <footer>footer from layout</footer>
  </div>;
};


