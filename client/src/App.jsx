import {
  Button,
  Container,
  Paper,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#F4F4F6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img src="./image/image.jfif" alt="" height={"600px"} width={"700px"} />
        <Container
          sx={{
            //
            overflow: "hidden",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              //mt: 10,
              width: "500px",
              marginLeft: "3rem",
              textAlign: "center",
              // position: "relative",
              // zIndex: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Discover Your Next Favorite Movie!
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Sign up or log in to continue your cinematic adventure.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
              <Button
                sx={{ marginRight: "1rem", bgcolor: "secondary.main" }}
                variant="contained"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
              <Button
                sx={{ bgcolor: "secondary.main" }}
                variant="contained"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </Stack>
            <Typography variant="body2" color="textSecondary" mt={4}>
              Join MovieMania and start exploring an endless array of films.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
