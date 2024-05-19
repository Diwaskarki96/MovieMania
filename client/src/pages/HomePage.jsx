import { Box, CircularProgress, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { $axios } from "../axios/axiosInstance";
import MovieCard from "../components/MovieCard";
import { fallBackImage } from "../constants/general.constants";
import Loader from "../components/Loader";

const HomePage = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const { isPending, data } = useQuery({
    queryKey: ["get-all-movies", currentPage],
    queryFn: async () => {
      return await $axios.post("/movie/list/user", {
        page: currentPage,
        limit: 6,
      });
    },
  });

  const movieDetail = data?.data?.movieDetail;
  const totalPage = data?.data?.totalPage;
  if (isPending) {
    return <Loader />;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      //  justifyContent="center"
      alignItems={"center"}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "column",
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

export default HomePage;
