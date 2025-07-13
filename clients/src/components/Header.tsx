import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHome } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useAuth();
  const token = user?.token;
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <AppBar
      position="static"
      color={isAuthPage ? "default" : "primary"}
      elevation={isAuthPage ? 0 : 4}
      sx={isAuthPage ? { bgcolor: { lg: "#0B8457", xs: "#EEEEEE" } } : {}}
    >
      <Toolbar>
        {isAuthPage ? (
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ fontSize: "2rem", color: "#000000" }}
          >
            <FaHome />
          </Button>
        ) : !token ? (
          <>
            <Button color="inherit" component={Link} to="/register">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Log In
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/home">
              Posts
            </Button>
            <Button color="inherit" component={Link} to="/blogs/new">
              New Blog
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Typography sx={{ mx: 2 }}>Welcome, {user?.username}</Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
