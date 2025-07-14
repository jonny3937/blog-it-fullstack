import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  CardActions,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions as MuiDialogActions,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import API from "../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CgProfile } from "react-icons/cg";
import { TiThMenuOutline } from "react-icons/ti";
import Drawer from "@mui/material/Drawer";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    API.get("/blogs").then((res) => setPosts(res.data));
  }, []);

  const handleDeleteClick = (id: string) => {
    setBlogToDelete(id);
    setDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (blogToDelete) {
      await API.delete(`/blogs/${blogToDelete}`);
      setPosts(posts.filter((post) => post.id !== blogToDelete));
      setSnackbarOpen(true);
    }
    setDialogOpen(false);
    setBlogToDelete(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setBlogToDelete(null);
  };

  const getDisplayName = () => {
    if (!user) return "Welcome";
    return `Welcome back, ${user.username}`;
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ mb: 4, bgcolor: "#0B8457" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", color: "#FFFFFF" }}
          >
            <CgProfile style={{ marginRight: 8 }} />
            {getDisplayName()}
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button
              variant="contained"
              onClick={() => navigate("/blogs/new")}
              sx={{
                backgroundColor: "#0B8457",
                "&:hover": { backgroundColor: "#08613E" },
                color: "#FFF",
                mr: 2,
              }}
            >
              Create +
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/profile")}
              sx={{
                backgroundColor: "#34495E",
                "&:hover": { backgroundColor: "#2C3E50" },
                color: "#FFF",
                mr: 2,
              }}
            >
              My Profile
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                logout();
                navigate("/");
              }}
              sx={{
                bgcolor: "#E4572E",
                color: "#FFF",
                borderColor: "#E4572E",
                "&:hover": {
                  bgcolor: "#B03C1E",
                  borderColor: "#B03C1E",
                },
              }}
            >
              Logout
            </Button>
          </Box>
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "#FFF" }}
            onClick={() => setDrawerOpen(true)}
            edge="end"
            aria-label="menu"
          >
            <TiThMenuOutline size={28} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 220, p: 2, display: "flex", flexDirection: "column", gap: 2 }}
          role="presentation"
        >
          <Button
            variant="contained"
            onClick={() => {
              setDrawerOpen(false);
              navigate("/blogs/new");
            }}
            sx={{
              backgroundColor: "#0B8457",
              "&:hover": { backgroundColor: "#08613E" },
              color: "#FFF",
            }}
            fullWidth
          >
            Create +
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setDrawerOpen(false);
              navigate("/profile");
            }}
            sx={{
              backgroundColor: "#34495E",
              "&:hover": { backgroundColor: "#2C3E50" },
              color: "#FFF",
            }}
            fullWidth
          >
            My Profile
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setDrawerOpen(false);
              logout();
              navigate("/");
            }}
            sx={{
              bgcolor: "#E4572E",
              color: "#FFF",
              borderColor: "#E4572E",
              "&:hover": {
                bgcolor: "#B03C1E",
                borderColor: "#B03C1E",
              },
            }}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "#34495E", mb: 2 }}
          >
            Recent Blogs
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ ml: 5, justifyContent: { xs: "center", md: "flex-start" }, display: "flex" }} alignItems="stretch">
          {posts.map((post) => (
            <Grid key={post.id} sx={{ maxWidth: 400, width: "100%" }}>
              <Card
                sx={{
                  mb: 3,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "visible",
                  boxShadow: 4,
                  borderRadius: 3,
                  bgcolor: "#FFFFFF",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                {post.featuredImg && (
                  <CardMedia
                    component="img"
                    image={post.featuredImg}
                    alt="featured"
                    sx={{ height: 180, objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: "none",
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      mb: 1,
                      color: "#2C3E50",
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {post.synopsis}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Box
                      sx={{
                        bgcolor: "#34495E",
                        color: "#fff",
                        borderRadius: "50%",
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      {post.author.username[0].toUpperCase()}
                    </Box>
                    <Typography variant="subtitle2">
                      {post.author.username}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 2 }}
                    >
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : ""}
                    </Typography>
                  </Box>
                  <Button
                    component={Link}
                    to={`/blogs/${post.id}`}
                    size="small"
                    variant="text"
                    sx={{
                      color: "primary",
                      "&:hover": {
                        borderColor: "#08613E",
                        color: "primary",
                      },
                    }}
                  >
                    ....Read More
                  </Button>
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end" }}>
                  {post?.author?.id &&
                    user?.id &&
                    String(post.author.id) === String(user.id) && (
                      <>
                        <IconButton
                          component={Link}
                          to={`/blogs/edit/${post.id}`}
                          size="small"
                          sx={{
                            color: "#3D74B6",
                            "&:hover": { color: "#08613E" },
                          }}
                        >
                          <CiEdit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(post.id)}
                          size="small"
                          sx={{
                            color: "#E4572E",
                            "&:hover": { color: "#B03C1E" },
                          }}
                        >
                          <MdDelete />
                        </IconButton>
                      </>
                    )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            width: "100%",
            color: "#FFF",
            bgcolor: "#0B8457",
            fontWeight: "bold",
          }}
        >
          Blog deleted successfully
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Are you sure you want to delete this blog?</DialogTitle>
        <DialogContent>
          <Typography>This action cannot be undone.</Typography>
        </DialogContent>
        <MuiDialogActions>
          <Button onClick={handleDialogClose} sx={{ color: "#34495E" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              bgcolor: "#E4572E",
              color: "#FFF",
              "&:hover": {
                bgcolor: "#B03C1E",
              },
            }}
            autoFocus
          >
            Delete
          </Button>
        </MuiDialogActions>
      </Dialog>
    </>
  );
}
