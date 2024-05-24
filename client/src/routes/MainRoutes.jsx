import AuthGuard from "../guard/AuthGuard";
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
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
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
        path: "profile/:id",
        element: <ProfilePage />,
      },

      {
        path: "about-us",
        element: <AboutUsPage />,
      },
    ],
  },
];
