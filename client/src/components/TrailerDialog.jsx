import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams } from "react-router-dom";
import { $axios } from "../axios/axiosInstance";
import Loader from "./Loader";
import { Box, Typography } from "@mui/material";

const TrailerDialog = () => {
  const params = useParams();
  const movieId = params.id;
  const { isPending, data } = useQuery({
    queryKey: ["watch-trailer", movieId],
    queryFn: async () => {
      return await $axios.get(`/movie/details/${movieId}`);
    },
  });
  const movieDetail = data?.data?.movieDetail;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (isPending) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Watch Trailer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {movieDetail.trailer ? (
          <iframe
            width="560"
            height="315"
            src={movieDetail.trailer || "Something went wrong"}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <Typography
            variant="h4"
            sx={{
              padding: "2rem",
              textAlign: "center",
              color: "primary.main",
              backgroundColor: "background.paper",
              borderRadius: "8px",
              boxShadow: 3,
              margin: "2rem",
              fontWeight: "bold",
            }}
          >
            Trailer not available for the moment 😓
          </Typography>
        )}
      </Dialog>
    </React.Fragment>
  );
};
export default TrailerDialog;
