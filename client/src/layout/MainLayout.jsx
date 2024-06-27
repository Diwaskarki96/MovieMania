import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import CustomSnackbar from "../components/CustomSnackbar";
import { Stack } from "@mui/material";
import App from "../App";

const MainLayout = () => {
  return (
    <div>
      <CustomSnackbar />
      <Header />

      <Stack sx={{ padding: "0 1rem", minHeight: "80vh" }}>
        <Outlet />
      </Stack>
      <Footer />
    </div>
  );
};

export default MainLayout;
