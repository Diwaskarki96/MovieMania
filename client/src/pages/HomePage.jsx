import {
  Box,
  CircularProgress,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Pagination,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { $axios } from "../axios/axiosInstance";
import MovieCard from "../components/MovieCard";
import { fallBackImage } from "../constants/general.constants";
import Loader from "../components/Loader";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
const HomePage = () => {
  const [searchText, setsearchText] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const { isPending, data } = useQuery({
    queryKey: ["get-all-movies", currentPage, searchText],
    queryFn: async () => {
      return await $axios.post("/movie/list/user", {
        page: currentPage,
        limit: 6,
        searchText: searchText || null,
      });
    },
  });

  const movieDetail = data?.data?.movieDetail;
  const totalPage = data?.data?.totalPage;
  const updateSearchText = (text) => {
    setsearchText(text);
    setcurrentPage(1);
  };
  //delay for user to write in search bar
  const delayedUpdateSearchText = debounce(updateSearchText, 1000);
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
      <FormControl variant="standard">
        <OutlinedInput
          sx={{ mt: "1rem" }}
          placeholder="Search Movies here..."
          onChange={(event) => {
            delayedUpdateSearchText(event?.target?.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#1976D2", fontSize: "2rem" }} />
            </InputAdornment>
          }
        />
      </FormControl>
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
