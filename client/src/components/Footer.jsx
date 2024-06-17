import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "70px",
        width: "100vw",
        background: "#1976D2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ color: "white" }}>
        © 2024 Copyright: MovieMania
      </Typography>
    </Box>
  );
};

export default Footer;
