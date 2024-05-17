import MainLayout from "../layout/MainLayout";
import AboutUsPage from "../pages/AboutUsPage";
import AddMovie from "../pages/AddMovie";
import AdminPage from "../pages/AdminPage";
import EditMovie from "../pages/EditMovie";
import HomePage from "../pages/HomePage";
import MovieDetail from "../pages/MovieDetail";
import ProfilePage from "../pages/ProfilePage";

export const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "movie-detail/:id",
        element: <MovieDetail />,
      },
      {
        path: "add-movie",
        element: <AddMovie />,
      },
      {
        path: "admin/home",
        element: <AdminPage />,
      },
      {
        path: "profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "movie-edit/:id",
        element: <EditMovie />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
    ],
  },
];
