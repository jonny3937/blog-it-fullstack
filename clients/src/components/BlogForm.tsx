import React, { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import ImageUpload from "./ImageUpload";

export default function BlogForm() {
  const [post, setPost] = useState({
    title: "",
    synopsis: "",
    content: "",
    featuredImg: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const handleImageUpload = (url: string) => {
    setPost((prev) => ({ ...prev, featuredImg: url }));
  };

  const submit = async () => {
    try {
      await API.post("/blogs", post);
      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: "100%", mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <Button variant="outlined" onClick={() => navigate("/blogs")}>
            Back
          </Button>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Upload Featured Image
        </Typography>
        <ImageUpload onUpload={handleImageUpload} />
        {post.featuredImg && (
          <Box mt={2}>
            <img
              src={post.featuredImg}
              alt="Featured"
              style={{ maxWidth: "100%", borderRadius: 4 }}
            />
          </Box>
        )}

        <TextField
          name="title"
          label="Title"
          fullWidth
          margin="normal"
          value={post.title}
          onChange={handleChange}
        />
        <TextField
          name="synopsis"
          label="Synopsis"
          fullWidth
          margin="normal"
          value={post.synopsis}
          onChange={handleChange}
        />
        <TextField
          name="content"
          label="Content (Markdown supported)"
          fullWidth
          margin="normal"
          value={post.content}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <Button variant="contained" onClick={submit} fullWidth sx={{ mt: 2 }}>
          Create
        </Button>
      </Paper>
    </Box>
  );
}
