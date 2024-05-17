import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams } from "react-router-dom";
import { $axios } from "../axios/axiosInstance";

const TrailerDialog = () => {
  const params = useParams();
  const movieId = params.id;
  const { isPending, data } = useQuery({
    queryKey: ["watch-trailer"],
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
    return <CircularProgress />;
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
        <iframe
          width="560"
          height="315"
          src={movieDetail.trailer || "Something went wrong"}
          title="YouTube video player"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          //  referrerpolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
};
export default TrailerDialog;
