import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  changePasswordValidation,
  editProfileValidation,
} from "../validation/editProfileValidationSchema";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import axios from "axios";
import { fallBackImage } from "../constants/general.constants";
import { setProfilePicture } from "../store/slices/profilePictureSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const ProfilePage = () => {
  const [userImage, setuserImage] = useState(null);
  const [localUrl, setlocalUrl] = useState("");
  const [imageLoadLoading, setimageLoadLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isPending: getUserDetailPending, data } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: () => {
      return $axios.post(`/user/user-detail/${userId}`);
    },
  });
  const { isPending: editProfilePending, mutate: editProfileMutate } =
    useMutation({
      mutationKey: ["edit-profile"],
      mutationFn: (values) => {
        return $axios.put(`/user/editProfile/${userId}`, values);
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries("Login-user");
        dispatch(openSuccessSnackbar(res?.data?.message));
      },
      onError: (error) => {
        dispatch(openErrorSnackbar(error?.response?.data?.message));
      },
    });
  const { isPending: changePasswordPending, mutate: changePasswordMutate } =
    useMutation({
      mutationKey: ["changePassword"],
      mutationFn: (values) => {
        return $axios.put(`/user/changePassword/${userId}`, {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
      },
      onSuccess: (res) => {
        dispatch(openSuccessSnackbar(res?.data?.message));
        dispatch(setProfilePicture(res?.data?.profilePicture));
      },
      onError: (error) => {
        dispatch(openErrorSnackbar(error?.response?.data?.msg));
      },
    });
  const userDetails = data?.data?.data;
  const firstName = userDetails?.firstName;
  const lastName = userDetails?.lastName;
  // const profilePicture = userDetails?.profilePicture;
  if (
    getUserDetailPending ||
    editProfilePending ||
    changePasswordPending ||
    imageLoadLoading
  ) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Formik
          initialValues={{
            profilePicture: userDetails.profilePicture || null,
            firstName: firstName || "",
            lastName: lastName || "",
          }}
          enableReinitialize={true}
          validationSchema={editProfileValidation}
          onSubmit={async (values) => {
            let imageUrl = null;
            if (userImage) {
              const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
              const uploadPreset = import.meta.env
                .VITE_CLOUDINARY_UPLOAD_PRESET;
              const data = new FormData();
              data.append("file", userImage);
              data.append("cloud_name", cloudName);
              data.append("upload_preset", uploadPreset);
              try {
                setimageLoadLoading(true);
                const response = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  data
                );

                setimageLoadLoading(false);
                imageUrl = response?.data?.secure_url;
                dispatch(setProfilePicture(imageUrl));
                localStorage.setItem("profilePicture", imageUrl);
                values.profilePicture = imageUrl;
              } catch (error) {
                setimageLoadLoading(false);
                console.error(error.message);
              }
            }
            editProfileMutate(values);
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
                <Stack sx={{ height: "350px" }}>
                  <img
                    src={
                      localUrl || userDetails.profilePicture || fallBackImage
                    }
                    alt=""
                    height={"93%"}
                  />
                  <input
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setuserImage(file);
                      setlocalUrl(URL.createObjectURL(file));
                    }}
                  />
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

                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </form>
            );
          }}
        </Formik>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
          }}
          validationSchema={changePasswordValidation}
          onSubmit={(values) => {
            changePasswordMutate(values);
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
                  marginTop: "16.5rem",
                }}
              >
                <Typography variant="h4" sx={{ marginLeft: "2rem" }}>
                  Change Password
                </Typography>
                <FormControl variant="outlined">
                  <InputLabel label="old password">Old Password</InputLabel>
                  <OutlinedInput
                    {...formik.getFieldProps("oldPassword")}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Old Password"
                  />
                  {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <FormHelperText error>
                      {formik.errors.oldPassword}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel>New Password</InputLabel>
                  <OutlinedInput
                    {...formik.getFieldProps("newPassword")}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <FormHelperText error>
                      {formik.errors.newPassword}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <Button variant="contained" type="submit">
                  Change Password
                </Button>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default ProfilePage;
