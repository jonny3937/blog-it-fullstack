import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Avatar,
  Divider,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/Api";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Profile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "" });
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({ username: "", email: "" });
  const [pwErrors, setPwErrors] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) setForm({ username: user.username, email: user.email });
  }, [user]);

  const validateInfoForm = () => {
    const newErrors = { username: "", email: "" };

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.email;
  };

  const submitInfo = async () => {
    if (!validateInfoForm()) {
      return;
    }

    try {
      const { data } = await API.patch("/user", form);
      setUser(data);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  const validatePasswordForm = () => {
    const newPwErrors = { currentPassword: "", newPassword: "" };

    if (!pwForm.currentPassword.trim()) {
      newPwErrors.currentPassword = "Current password is required";
    }

    if (!pwForm.newPassword.trim()) {
      newPwErrors.newPassword = "New password is required";
    } else if (pwForm.newPassword.length < 6) {
      newPwErrors.newPassword = "Password must be at least 6 characters long";
    }

    setPwErrors(newPwErrors);
    return !newPwErrors.currentPassword && !newPwErrors.newPassword;
  };

  const submitPassword = async () => {
    if (!validatePasswordForm()) {
      return;
    }

    try {
      await API.patch("/user/password", pwForm);
      alert("Password updated successfully!");
      setPwForm({ currentPassword: "", newPassword: "" });
      setPwErrors({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert("Failed to update password.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 0, width: "100%" }}>
      <AppBar position="static" sx={{ bgcolor: "#0A400C", mb: 4 }}>
        <Toolbar>
          <Button
            variant="text"
            onClick={() => navigate("/blogs")}
            sx={{
              mr: 2,
              color: "#e0e0e0",
              borderColor: "#f0b7b7ff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textTransform: "none",
              px: 3,
              py: 1,
            }}
          >
            <IoMdArrowRoundBack />
          </Button>
          <Typography
            variant="h6"
            sx={{ color: "#e0e0e0", fontWeight: "bold" }}
          >
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar sx={{ width: 72, height: 72, bgcolor: "#0A400C" }}>
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">{user?.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Update Personal Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
              if (errors.username) {
                setErrors({ ...errors, username: "" });
              }
            }}
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
              if (errors.email) {
                setErrors({ ...errors, email: "" });
              }
            }}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
          />
          <Button
            variant="contained"
            onClick={submitInfo}
            sx={{
              alignSelf: "flex-start",
              bgcolor: "#0A400C",
              "&:hover": { bgcolor: "#093b0b" },
            }}
          >
            Save Info
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField
            type="password"
            label="Current Password"
            name="currentPassword"
            value={pwForm.currentPassword}
            onChange={(e) => {
              setPwForm({ ...pwForm, [e.target.name]: e.target.value });
              if (pwErrors.currentPassword) {
                setPwErrors({ ...pwErrors, currentPassword: "" });
              }
            }}
            error={!!pwErrors.currentPassword}
            helperText={pwErrors.currentPassword}
            fullWidth
            required
          />
          <TextField
            type="password"
            label="New Password"
            name="newPassword"
            value={pwForm.newPassword}
            onChange={(e) => {
              setPwForm({ ...pwForm, [e.target.name]: e.target.value });
              if (pwErrors.newPassword) {
                setPwErrors({ ...pwErrors, newPassword: "" });
              }
            }}
            error={!!pwErrors.newPassword}
            helperText={pwErrors.newPassword}
            fullWidth
            required
          />
          <Button
            variant="contained"
            onClick={submitPassword}
            sx={{
              alignSelf: "flex-start",
              bgcolor: "#0A400C",
              "&:hover": { bgcolor: "#093b0b" },
            }}
          >
            Update Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
