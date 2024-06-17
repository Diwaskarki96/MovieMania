import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = (props) => {
  const isUserLoggedIn = localStorage.getItem("accessToken");
  const isUser = localStorage.getItem("role") === "user";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn && !isUser) {
      navigate("/login", { replace: true });
    }
  }, [isUserLoggedIn, navigate, isUser]);

  return <div>{isUserLoggedIn && isUser ? props.children : null}</div>;
};

export default AuthGuard;
