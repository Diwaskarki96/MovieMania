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
import { Formik } from "formik";
import React, { useState } from "react";
import movieValidationSchema from "../validation/movieValidationSchema";
import { $axios } from "../axios/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fallBackImage, genre } from "../constants/general.constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import Loader from "../components/Loader";

const EditMovie = () => {
  const [movieImage, setmovieImage] = useState(null);
  const [localUrl, setlocalUrl] = useState("");
  const [imageLoadLoading, setimageLoadLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params?.id;
  const dispatch = useDispatch();
  const { isPending: getAllMoviePending, data } = useQuery({
    queryKey: ["get-movie-detail"],
    queryFn: async () => {
      return await $axios.get(`/movie/details/${movieId}`);
    },
  });
  const movieDetail = data?.data?.movieDetail;
  console.log(movieDetail);
  const { isPending: editPending, mutate } = useMutation({
    mutationKey: ["edit-movie"],
    mutationFn: async (values) => {
      const role = localStorage.getItem("role");
      const data = { ...values, role };
      return await $axios.put(`/movie/edit/${movieId}`, data);
    },
    onSuccess: (res) => {
      navigate("/admin/home");
      dispatch(openSuccessSnackbar(res?.data?.msg));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.msg));
    },
  });
  if (getAllMoviePending || editPending || imageLoadLoading) {
    return <Loader />;
  }
  return (
    <>
      <Box>
        <Formik
          initialValues={{
            title: movieDetail?.title || "",
            genre: movieDetail?.genre || "",
            director: movieDetail?.director || "",
            cast: movieDetail?.cast || "",
            rating: movieDetail?.rating || "",
            description: movieDetail?.description || "",
            image: movieDetail?.image || "",
            releaseDate: movieDetail?.releaseDate || "",
            trailer: movieDetail?.trailer || "",
          }}
          validationSchema={movieValidationSchema}
          onSubmit={async (values) => {
            let imageUrl = null;
            if (movieImage) {
              const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
              const uploadPreset = import.meta.env
                .VITE_CLOUDINARY_UPLOAD_PRESET;
              const data = new FormData();
              data.append("file", movieImage);
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
              } catch (error) {
                setimageLoadLoading(false);

                console.error(error.message);
              }
            }
            values.image = imageUrl;
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <Container
                sx={{
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  width: "60%",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  gap: "2rem",
                }}
              >
                <form
                  onSubmit={formik.handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                  }}
                >
                  <Typography variant="h4">Edit Movies</Typography>
                  <Stack sx={{ height: "350px" }}>
                    <img
                      src={localUrl || movieDetail?.image || fallBackImage}
                      alt=""
                      height={"100%"}
                    />
                  </Stack>
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
                      <FormHelperText error>
                        {formik.errors.title}
                      </FormHelperText>
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
                      <FormHelperText error>
                        {formik.errors.genre}
                      </FormHelperText>
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
                      <FormHelperText error>
                        {formik.errors.cast}
                      </FormHelperText>
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
              </Container>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default EditMovie;
