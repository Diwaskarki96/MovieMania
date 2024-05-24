import AdminLayout from "../layout/AdminLayout";
import AddMovie from "../pages/AddMovie";
import AdminLogin from "../pages/AdminLogin";
import AdminPage from "../pages/AdminPage";
import EditMovie from "../pages/EditMovie";

export const AdminRoute = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "admin/home",
        element: <AdminPage />,
      },
      {
        path: "admin/movie-edit/:id",
        element: <EditMovie />,
      },
      {
        path: "admin/add-movie",
        element: <AddMovie />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
];
