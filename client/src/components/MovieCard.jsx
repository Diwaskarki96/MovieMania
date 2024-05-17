import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { fallBackImage } from "../constants/general.constants";

export default function MovieCard({
  title,
  genre,
  description,
  image,
  _id,
  cast,
  releaseDate,
  director,
  rating,
}) {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: "460px", width: "400px", padding: "0.5rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300px"
          width="100px"
          image={image || fallBackImage}
          alt="green iguana"
          sx={{ objectFit: "cover" }}
          onClick={() => {
            navigate(`/movie-detail/${_id}`);
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body1" color="primary.main">
            {rating}⭐
          </Typography>
          <Typography variant="body2" sx={{ heigth: "200px", width: "300px" }}>
            {description.substring(0, 40).concat("...")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            navigate(`/movie-detail/${_id}`);
          }}
        >
          See More
        </Button>
      </CardActions>
    </Card>
  );
}
