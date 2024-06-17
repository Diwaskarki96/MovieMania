import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";

const GuestLayout = () => {
  return (
    <div>
      <CustomSnackbar />
      <Outlet />
    </div>
  );
};

export default GuestLayout;
