import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Container,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";

export default function BlogEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    featuredImg: "",
    content: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then((res) => {
        const { title, synopsis, featuredImg, content } = res.data;
        setFormData({
          title: title || "",
          synopsis: synopsis || "",
          featuredImg: featuredImg || "",
          content: content || "",
        });
      })
      .catch((err) => {
        console.error("Failed to fetch blog data:", err);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.put(`/blogs/${id}`, formData);
      setSnackbarOpen(true);
      setTimeout(() => navigate("/blogs"), 1500);
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#0B8457", position: "static" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/blogs")}
          >
            <IoMdArrowRoundBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BlogIt | Edit Blog
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Update Your Blog
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Image URL"
            name="featuredImg"
            value={formData.featuredImg}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Content (Markdown supported)"
            name="content"
            value={formData.content}
            onChange={handleChange}
            multiline
            rows={10}
            fullWidth
            margin="normal"
            required
          />

          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Update Blog
            </Button>
          </Box>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Blog updated successfully!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
