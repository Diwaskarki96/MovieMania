import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminAuthGuard = (props) => {
  const isAdminLoggedIn = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdminLoggedIn || role !== "admin") {
      navigate("/admin/login", { replace: true });
    }
    if (isAdminLoggedIn && role === "admin") {
      navigate("/admin/home", { replace: true });
    }
  }, [isAdminLoggedIn, navigate, role]);
  return <div>{isAdminLoggedIn && props.children}</div>;
};

export default AdminAuthGuard;
