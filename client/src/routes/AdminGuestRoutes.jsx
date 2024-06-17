import React from "react";
import AdminGuestLayout from "../layout/AdminGuestLayout";
import AdminLogin from "../pages/AdminLogin";
import AdminAuthGuard from "../guard/AdminAuthGuard";

export const AdminGuestRoutes = [
  {
    path: "/admin",
    element: (
      <AdminAuthGuard>
        <AdminGuestLayout />
      </AdminAuthGuard>
    ),
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
    ],
  },
];
