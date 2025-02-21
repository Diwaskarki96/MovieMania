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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfilePicture } from "../store/slices/profilePictureSlice";

export default function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  // const profilePicture = localStorage.getItem("profilePicture");
  const { profilePicture } = useSelector((state) => state.profilePicture);
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
          <Typography
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              if (role === "user") {
                navigate("/home");
              } else if (role === "admin") {
                navigate("/admin/home");
              }
            }}
          >
            <img
              src="/image/MovieMania v2.png"
              alt=""
              style={{ height: "100%", width: "120px" }}
            />
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              role === "user" ? navigate("/home") : navigate("/admin/home");
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/about-me");
            }}
          >
            About me
          </Button>
          {role === "user" && (
            <Tooltip title={"Profile"}>
              <IconButton
                onClick={() => {
                  navigate(`/profile/${userID}`);
                }}
              >
                <Avatar
                  sx={{ objectFit: "cover" }}
                  alt="Profile"
                  src={
                    profilePicture ||
                    "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                  }
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
                dispatch(setProfilePicture(null));
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
