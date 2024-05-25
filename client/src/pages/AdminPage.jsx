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
  TextField,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { fallBackImage } from "../constants/general.constants";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { debounce } from "lodash";
import SearchIcon from "@mui/icons-material/Search";

const AdminPage = () => {
  const [searchText, setsearchText] = useState("");

  const [currentPage, setcurrentPage] = useState(1);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
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
  const totalPage = data?.data?.totalPage;

  const movieDetail = data?.data?.movieDetail;
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
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        mt: "1rem",
      }}
    >
      <Box
        display="flex"
        gap="2rem"
        alignItems="center"
        justifyContent="center"
      >
        <FormControl variant="standard">
          <OutlinedInput
            placeholder="Search Movies here..."
            onChange={(event) => {
              //setsearchText(event?.target?.value);
              delayedUpdateSearchText(event?.target?.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#1976D2", fontSize: "2rem" }} />
              </InputAdornment>
            }
          />
        </FormControl>
        {role === "admin" && (
          <Button
            variant="contained"
            sx={{ height: "3rem" }}
            onClick={() => {
              navigate("/admin/add-movie");
            }}
          >
            Add movie
          </Button>
        )}
      </Box>
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
