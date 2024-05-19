import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuestGuard = (props) => {
  const isUserLoggedIn = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn && role === "user") {
      //The { replace: true } option ensures that the navigation replaces the current history entry instead of adding a new one.
      navigate("/home", { replace: true });
    } else if (isUserLoggedIn && role === "admin") {
      navigate("/admin/home", { replace: true });
    }
  }, [isUserLoggedIn, navigate, role]);
  return <>{!isUserLoggedIn && props.children}</>;
};

export default GuestGuard;
