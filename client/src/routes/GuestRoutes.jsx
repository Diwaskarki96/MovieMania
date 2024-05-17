import App from "../App";
import GuestLayout from "../layout/GuestLayout";
import AdminLogin from "../pages/AdminLogin";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

export const guestRoutes = [
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
      {
        path: "admin",
        element: <AdminLogin />,
      },
    ],
  },
];
