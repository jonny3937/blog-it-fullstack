import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/Api";
import ReactMarkdown from "react-markdown";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function BlogView() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then((res) => setPost(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  if (!post)
    return (
      <Typography variant="h6" color="error">
        Blog not found.
      </Typography>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/blogs")}
          sx={{ bgcolor: "#e0e0e0", color: "#000000" }}
        >
          <IoMdArrowRoundBack size={20} />
        </Button>
      </Box>
      <Paper elevation={3} sx={{ p: 4 }}>
        {post.featuredImg && (
          <Box mb={3}>
            <img
              src={post.featuredImg}
              alt="Featured"
              style={{
                width: "100%",
                maxHeight: 350,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </Box>
        )}
        <Typography variant="h3" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {post.synopsis}
        </Typography>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: "#1976d2" }}>
            {post.author?.firstName && post.author?.lastName
              ? `${post.author.firstName[0]}${post.author.lastName[0]}`.toUpperCase()
              : post.author?.username?.[0]?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle2">
              {post.author?.firstName && post.author?.lastName
                ? `${post.author.firstName} ${post.author.lastName}`
                : post.author?.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Created: {new Date(post.createdAt).toLocaleString()} | Updated:{" "}
              {new Date(post.updatedAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Box mt={4}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
}
