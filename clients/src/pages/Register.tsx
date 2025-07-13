import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Avatar,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    firstName: false,
    lastName: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({
      username: true,
      email: true,
      password: true,
      firstName: true,
      lastName: true,
    });
    const hasError = Object.values(form).some((val) => !val);
    if (hasError) return;
    await register(
      form.username,
      form.email,
      form.password,
      form.firstName,
      form.lastName,
    );
    navigate("/login");
  };

  const getError = (field: keyof typeof form) =>
    (touched[field] || submitted) && !form[field]
      ? "This field is required"
      : "";

  return (
    <Container
      maxWidth="xs"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Paper elevation={4} sx={{ p: 4, width: "100%", textAlign: "center" }}>
        <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}></Avatar>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Create your <strong>BlogIt</strong> Account
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Start writing, sharing, and inspiring the world
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!getError("username")}
            helperText={getError("username")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!getError("email")}
            helperText={getError("email")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!getError("password")}
            helperText={getError("password")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!getError("firstName")}
            helperText={getError("firstName")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!getError("lastName")}
            helperText={getError("lastName")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
