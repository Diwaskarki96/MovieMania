import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = (props) => {
  const isUserLoggedIn = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn && role === "user") {
      navigate("/login", { replace: true });
    } else if (!isUserLoggedIn && role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [isUserLoggedIn, navigate, role]);
  return <div>{isUserLoggedIn && props.children}</div>;
};

export default AuthGuard;
