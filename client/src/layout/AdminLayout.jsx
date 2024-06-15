import React from "react";
import CustomSnackbar from "../components/CustomSnackbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

const AdminLayout = () => {
  return (
    <>
      <CustomSnackbar />
      <Header />
      <Stack
        sx={{
          padding: "0 1rem",
          minHeight: "80vh",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem 0",
        }}
      >
        <Outlet />
      </Stack>
      <Footer />
    </>
  );
};

export default AdminLayout;
