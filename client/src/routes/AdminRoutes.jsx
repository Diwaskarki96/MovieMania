import AdminAuthGuard from "../guard/AdminAuthGuard";
import AdminLayout from "../layout/AdminLayout";
import AddMovie from "../pages/AddMovie";
import AdminLogin from "../pages/AdminLogin";
import AdminPage from "../pages/AdminPage";
import EditMovie from "../pages/EditMovie";

export const AdminRoute = [
  {
    path: "/admin",
    element: (
      <AdminAuthGuard>
        <AdminLayout />
      </AdminAuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <AdminPage />,
      },
      {
        path: "movie-edit/:id",
        element: <EditMovie />,
      },
      {
        path: "add-movie",
        element: <AddMovie />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
];
