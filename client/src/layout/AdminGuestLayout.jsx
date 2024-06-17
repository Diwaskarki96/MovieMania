import React from "react";
import CustomSnackbar from "../components/CustomSnackbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

const AdminGuestLayout = () => {
  return (
    <>
      <CustomSnackbar />
      <Outlet />
    </>
  );
};

export default AdminGuestLayout;
