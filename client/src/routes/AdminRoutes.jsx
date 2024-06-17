import AdminAuthGuard from "../guard/AdminAuthGuard";
import AdminAuthLayout from "../layout/AdminAuthLayout";
import AddMovie from "../pages/AddMovie";
import AdminLogin from "../pages/AdminLogin";
import AdminMovieDetail from "../pages/AdminMovieDetail";
import AdminPage from "../pages/AdminPage";
import EditMovie from "../pages/EditMovie";

export const AdminRoute = [
  {
    path: "/admin",
    element: (
      <AdminAuthGuard>
        <AdminAuthLayout />
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
      {
        path: "movieDetail/:id",
        element: <AdminMovieDetail />,
      },
    ],
  },
];
