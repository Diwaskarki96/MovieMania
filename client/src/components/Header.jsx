import HdIcon from "@mui/icons-material/Hd";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const userID = localStorage.getItem("userID");
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HdIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            MovieMania
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              role === "user" ? navigate("/home") : navigate("/admin/home");
            }}
          >
            Home
          </Button>
          {role === "user" && (
            <Tooltip title={"Profile"}>
              <IconButton
                onClick={() => {
                  navigate(`/profile/${userID}`);
                }}
              >
                <Avatar
                  alt="Profile"
                  src="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Logout">
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => {
                navigate("/login");

                // clear local storage
                localStorage.clear();
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
