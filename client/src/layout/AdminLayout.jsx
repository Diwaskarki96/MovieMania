import React from "react";
import CustomSnackbar from "../components/CustomSnackbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <CustomSnackbar />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminLayout;
