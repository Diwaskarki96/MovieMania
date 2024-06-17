import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminAuthGuard = (props) => {
  const isAdminLoggedIn = localStorage.getItem("accessToken");
  const isAdmin = localStorage.getItem("role") === "admin";
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdminLoggedIn || !isAdmin) {
      navigate("/admin/login", { replace: true });
    }
    if (isAdminLoggedIn && isAdmin) {
      navigate("/admin/home", { replace: true });
    }
  }, [isAdminLoggedIn, navigate, isAdmin]);
  return <div>{props.children}</div>;
};

export default AdminAuthGuard;
