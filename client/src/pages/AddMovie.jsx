import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { $axios } from "../axios/axiosInstance";
import { genre } from "../constants/general.constants";
import movieValidationSchema from "../validation/movieValidationSchema";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import Loader from "../components/Loader";

const AddMovie = () => {
  const [movieImage, setmovieImage] = useState(null);
  const [localUrl, setlocalUrl] = useState("");
  const [imageUploadLoading, setimageUploadLoading] = useState(false);

  const dispatch = useDispatch();
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["add-movie"],
    mutationFn: async (values) => {
      const role = localStorage.getItem("role");
      const data = { ...values, role };
      return await $axios.post("/movie/add", data);
    },
    onSuccess: (res) => {
      navigate("/admin/home");
      dispatch(openSuccessSnackbar(res?.data?.msg));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.msg));
    },
  });
  if (isPending || imageUploadLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box>
        <Formik
          initialValues={{
            title: "",
            genre: "",
            director: "",
            cast: "",
            rating: "",
            description: "",
            image: null,
            releaseDate: "",
            trailer: "",
          }}
          validationSchema={movieValidationSchema}
          onSubmit={async (values) => {
            let imageUrl = null;
            if (movieImage) {
              const data = new FormData();
              data.append("file", movieImage);
              data.append("upload_preset", uploadPreset);
              data.append("cloud_name", cloudName);
              try {
                setimageUploadLoading(true);
                const response = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  data
                );
                imageUrl = response?.data?.secure_url;
                // console.log(response);
              } catch (error) {
                setimageUploadLoading(false);
                console.log(error.message);
              }
            }
            values.image = imageUrl;
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  margin: "3rem 0",
                  width: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                }}
              >
                <Typography variant="h4">Add Movies</Typography>
                {localUrl && (
                  <Stack sx={{ height: "350px" }}>
                    <img src={localUrl} alt="" height={"100%"} />
                  </Stack>
                )}
                <FormControl>
                  <input
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setmovieImage(file);
                      setlocalUrl(URL.createObjectURL(file));
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Title"
                    {...formik.getFieldProps("title")}
                    required
                  />

                  {formik.touched.title && formik.errors.title ? (
                    <FormHelperText error>{formik.errors.title}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel>Genre</InputLabel>
                  <Select label="genre" {...formik.getFieldProps("genre")}>
                    {genre.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>

                  {formik.touched.genre && formik.errors.genre ? (
                    <FormHelperText error>{formik.errors.genre}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Director"
                    {...formik.getFieldProps("director")}
                    required
                  />

                  {formik.touched.director && formik.errors.director ? (
                    <FormHelperText error>
                      {formik.errors.director}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Cast"
                    {...formik.getFieldProps("cast")}
                    required
                  />

                  {formik.touched.cast && formik.errors.cast ? (
                    <FormHelperText error>{formik.errors.cast}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Description"
                    {...formik.getFieldProps("description")}
                    required
                  />

                  {formik.touched.description && formik.errors.description ? (
                    <FormHelperText error>
                      {formik.errors.description}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Rating"
                    {...formik.getFieldProps("rating")}
                    required
                  />

                  {formik.touched.rating && formik.errors.rating ? (
                    <FormHelperText error>
                      {formik.errors.rating}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Release Date"
                    {...formik.getFieldProps("releaseDate")}
                    // required
                  />

                  {formik.touched.releaseDate && formik.errors.releaseDate ? (
                    <FormHelperText error>
                      {formik.errors.releaseDate}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Trailer"
                    {...formik.getFieldProps("trailer")}
                    // required
                  />

                  {formik.touched.trailer && formik.errors.trailer ? (
                    <FormHelperText error>
                      {formik.errors.trailer}
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
    </>
  );
};

export default AddMovie;
