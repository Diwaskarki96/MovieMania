import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { $axios } from "../axios/axiosInstance";
import MovieCard from "../components/MovieCard";
import { fallBackImage } from "../constants/general.constants";
import Loader from "../components/Loader";

const HomePage = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-all-movies"],
    queryFn: async () => {
      return await $axios.post("/movie/list/user");
    },
  });

  const movieDetail = data?.data?.movieDetail;
  if (isPending) {
    return <Loader />;
  }
  return (
    <>
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
    </>
  );
};

export default HomePage;
