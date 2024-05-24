import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminAuthGuard = (props) => {
  const isAdminLoggedIn = localStorage.getItem("accessToken");
  const isAdminRole = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/admin/login", { replace: true });
    }
    if (isAdminLoggedIn) {
      navigate("/admin/home", { replace: true });
    }
  }, [isAdminLoggedIn, navigate]);
  return <div>{isAdminLoggedIn && props.children}</div>;
};

export default AdminAuthGuard;
