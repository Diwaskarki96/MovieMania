import React from "react";

import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { fallBackImage } from "../constants/general.constants";
import TrailerDialog from "../components/TrailerDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteMovieDialog from "../components/DeleteMovieDialog";
import popupAlert from "../utils/alert";
import Loader from "../components/Loader";

const AdminMovieDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params.id;
  const userRole = localStorage.getItem("role");
  const { isPending, data } = useQuery({
    queryKey: ["get-movie-detail"],
    queryFn: async () => {
      return await $axios.get(`/movie/details/${movieId}`);
    },
  });
  //console.log(data.data.movieDetail);
  const movieDetail = data?.data?.movieDetail;
  if (isPending) {
    return <Loader />;
  }
  return (
    <Container sx={{ gap: "1rem" }}>
      <Paper elevation={6} sx={{ p: 4, my: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ gap: "1rem" }}>
            <img
              content="img"
              src={movieDetail.image || fallBackImage}
              alt="title"
              style={{ width: "100%", height: "600px", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              {movieDetail.title}
            </Typography>
            <Chip
              label={movieDetail.genre}
              color="success"
              sx={{ mb: "8px" }}
            ></Chip>
            <Typography variant="h5" gutterBottom>
              Cast:{movieDetail.cast}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Director:{movieDetail.director}
            </Typography>
            <Typography variant="body1" paragraph gutterBottom>
              <strong>Description:</strong> {movieDetail.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Release Date:{movieDetail.releaseDate}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Rating:{movieDetail.rating}⭐
            </Typography>
            <TrailerDialog />
            {userRole === "admin" && (
              <Stack
                direction="row"
                spacing={2}
                sx={{ width: "100%" }}
                mt="1rem"
              >
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    navigate(`/admin/movie-edit/${movieId}`);
                  }}
                  fullWidth
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    popupAlert(movieId, navigate);
                  }}
                  fullWidth
                >
                  Delete
                </Button>
                {/* <DeleteMovieDialog /> */}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminMovieDetail;
