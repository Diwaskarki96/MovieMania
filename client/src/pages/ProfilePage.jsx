import { Formik } from "formik";
import { useState } from "react";
import { editProfileValidation } from "../validation/editProfileValidationSchema";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const [profileImage, setprofileImage] = useState(null);
  const [localUrl, setlocalUrl] = useState(null);
  const [imageLoading, setimageLoading] = useState(false);
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const queryClient = useQueryClient();
  useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      //  return $axios.get
    },
  });
  const { isPending, mutate } = useMutation({
    mutationKey: ["edit-profile"],
    mutationFn: async (values) => {
      return await $axios.put(`/user/editProfile/${userId}`, values);
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries("Login-user");
      navigate("/home");
    },
  });
  if (isPending) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        height: "60vh",
        //flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
          password: "",
        }}
        validationSchema={editProfileValidation}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "1rem",
                gap: "1rem",
                width: "350px",
              }}
            >
              <Typography variant="h4" sx={{ marginLeft: "5rem" }}>
                Edit Profile
              </Typography>
              <Stack sx={{ height: "250px" }}>
                <img src="" alt="" height="100%" />
              </Stack>
              <FormControl>
                <TextField
                  label="First Name"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormHelperText error>
                    {formik.errors.firstName}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl>
                <TextField
                  label="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <FormHelperText error>
                    {formik.errors.lastName}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl>
                <TextField
                  label="Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ProfilePage;
