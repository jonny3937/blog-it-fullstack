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

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [touched, setTouched] = useState({
    identifier: false,
    password: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLoginError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ identifier: true, password: true });
    if (!form.identifier || !form.password) return;
    try {
      await login(form.identifier, form.password);
      navigate("/blogs");
    } catch (err) {
      setLoginError("Invalid username/email or password.");
    }
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
        <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 2 }}>
          Welcome Back to <strong>BlogIt</strong>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to continue your blogging journey
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username or Email"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!getError("identifier")}
            helperText={getError("identifier")}
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
            error={!!getError("password") || !!loginError}
            helperText={getError("password") || loginError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
          >
            Login
          </Button>
        </Box>
        <Button
          fullWidth
          variant="text"
          sx={{ mt: 2 }}
          onClick={() => navigate("/forget-password")}
        >
          Forgot Password?
        </Button>
      </Paper>
    </Container>
  );
}
