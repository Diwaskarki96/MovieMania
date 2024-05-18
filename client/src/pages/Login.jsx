import { Formik } from "formik";
import { useState } from "react";
import { loginValidationSchema } from "../validation/loginValidationSchema";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import Loader from "../components/Loader";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isPending, mutate } = useMutation({
    mutationKey: ["Login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (res) => {
      navigate("/home");
      dispatch(openSuccessSnackbar(res?.data?.msg));
      const firstName = res?.data?.data?.firstName;
      const lastName = res?.data?.data?.lastName;
      const accessToken = res?.data?.token;

      const userID = res?.data?.data?._id;

      const role = res?.data?.data?.role;

      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem("role", role);
      localStorage.setItem("userID", userID);
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.msg));
    },
  });
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <div>
              {isPending && <Loader />}
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  padding: "1rem",
                  gap: "1rem",
                  width: "350px",
                }}
              >
                <Typography variant="h3">Login</Typography>
                <FormControl>
                  <TextField
                    label="Email"
                    {...formik.getFieldProps("email")}
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <TextField
                    label="Password"
                    {...formik.getFieldProps("password")}
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormHelperText error>
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isPending}
                >
                  Login
                </Button>
                <Link to={"/register"}>New here? Register now</Link>
              </form>
            </div>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Login;
