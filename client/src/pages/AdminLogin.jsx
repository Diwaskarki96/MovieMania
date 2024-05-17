import { Formik } from "formik";
import { useState } from "react";
import { loginValidationSchema } from "../validation/loginValidationSchema";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const { isPending, mutate } = useMutation({
    mutationKey: ["Login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/admin/login", values);
    },
    onSuccess: (res) => {
      navigate("/admin/home");
      //const firstName = res?.data?.data?.firstName;
      const token = res?.data?.token;
      const role = res?.data?.role;

      localStorage.setItem("role", role);
      localStorage.setItem("token", token);
    },
    onError: (error) => {
      seterror(error.response.data.msg);
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
        //  validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <div>
              {error && (
                <Alert sx={{ marginBottom: "2rem" }} severity="error">
                  {error}
                </Alert>
              )}

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
                {isPending && <LinearProgress />}

                <Typography variant="h3">Admin Login</Typography>
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
              </form>
            </div>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AdminLogin;
