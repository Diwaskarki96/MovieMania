import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Pagination,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { fallBackImage } from "../constants/general.constants";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AdminPage = () => {
  const [currentPage, setcurrentPage] = useState(1);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const { isPending, data } = useQuery({
    queryKey: ["get-all-movies", currentPage],
    queryFn: async () => {
      return await $axios.post("/movie/list/user", {
        page: currentPage,
        limit: 6,
      });
    },
  });
  const totalPage = data?.data?.totalPage;

  const movieDetail = data?.data?.movieDetail;
  if (isPending) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        mt: "1rem",
      }}
    >
      {role === "admin" && (
        <Button
          variant="contained"
          onClick={() => {
            navigate("/add-movie");
          }}
        >
          {" "}
          Add movie{" "}
        </Button>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          margin: "1rem",
        }}
      >
        {movieDetail && movieDetail.length > 0 ? (
          movieDetail.map((item) => {
            return <MovieCard key={item._id} {...item} />;
          })
        ) : (
          <img src={fallBackImage} alt="" />
        )}
      </Box>
      <Pagination
        sx={{ margin: "2rem" }}
        page={currentPage}
        count={totalPage}
        color="primary"
        onChange={(_, value) => {
          setcurrentPage(value);
        }}
      />
    </Box>
  );
};

export default AdminPage;
