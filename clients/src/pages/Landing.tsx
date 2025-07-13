import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();

  return (
    <Box sx={{ bgcolor: "#EDEBD7", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#064420",
          borderBottom: "1px solid #052e15",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src="/download.png"
              alt="BlogIt Logo"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "4px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                ml: 1,
                fontSize: { xs: 20, md: 24 },
                letterSpacing: 1,
              }}
            >
              BlogIt
            </Typography>
          </Box>

          <Box>
            {["home", "about", "contact"].map((id) => (
              <MuiLink
                key={id}
                href={`#${id}`}
                underline="none"
                sx={{
                  mx: { xs: 1, md: 2 },
                  color: "#D1FAE5",
                  fontWeight: 500,
                  fontSize: { xs: 14, md: 16 },
                  textTransform: "capitalize",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#ffffff",
                  },
                }}
              >
                {id}
              </MuiLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        id="home"
        maxWidth="md"
        sx={{
          pt: { xs: 25, md: 20 },
          textAlign: "center",
          mb: 12,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: "#064420",
            mb: 2,
            fontSize: { xs: "2rem", md: "3.5rem" },
          }}
        >
          Share Ideas. Inspire Action.
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: "#A7C957" }}>
          Where voices find meaning and creativity flows freely.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 5, maxWidth: 650, mx: "auto", color: "#4B5563" }}
        >
          BlogIt offers a distraction-free writing platform to share your
          thoughts, experiences, and expertise. Whether you're a beginner or a
          seasoned storyteller, your words deserve to be heard.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => nav("/register")}
            sx={{
              bgcolor: "#064420",
              fontWeight: 600,
              px: 4,
              "&:hover": { bgcolor: "#043f1c" },
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => nav("/login")}
            sx={{
              color: "#064420",
              borderColor: "#064420",
              fontWeight: 600,
              px: 4,
              "&:hover": {
                bgcolor: "#f5f5f5",
                borderColor: "#043f1c",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
        <Box
          component="img"
          src="./download.png"
          alt="Blogging illustration"
          sx={{ width: "100%", maxWidth: 600, mt: 6 }}
        />
      </Container>

      <Container id="about" maxWidth="md" sx={{ textAlign: "center", mb: 10 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 2, color: "#064420" }}
        >
          Why Choose BlogIt?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#4B5563", maxWidth: 700, mx: "auto" }}
        >
          BlogIt is your platform for focused expression. Clean, simple, and
          powerful — it's designed to let your writing shine and your voice be
          heard without the noise.
        </Typography>
      </Container>

      <Container maxWidth="md" sx={{ textAlign: "center", mb: 10 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 4, color: "#064420" }}
        >
          Popular Reads
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          {[
            {
              title: "🌍 Backpacking Through Africa",
              snippet:
                "Hidden gems, breathtaking trails, and cultural stories from a 3-month travel across the continent.",
            },
            {
              title: "💻 Learn JavaScript from Scratch",
              snippet:
                "An intuitive guide for beginners to understand JS fundamentals with practical examples.",
            },
            {
              title: "🧘‍♀️ Digital Minimalism & Mindfulness",
              snippet:
                "Explore how staying mindful in our digital routines can spark peace and creativity.",
            },
            {
              title: "📸 Capturing Emotions in Still Frames",
              snippet:
                "Photography that tells stories without a single word. Tips and philosophy from behind the lens.",
            },
          ].map((blog, i) => (
            <Box
              key={i}
              sx={{
                p: 3,
                border: "1px solid #d1d5db",
                borderRadius: 2,
                textAlign: "left",
                bgcolor: "#ffffff",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 4,
                  borderColor: "#A7C957",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1, color: "#064420" }}
              >
                {blog.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#4B5563" }}>
                {blog.snippet}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Container
        id="contact"
        maxWidth="md"
        sx={{ textAlign: "center", mb: 10 }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 2, color: "#064420" }}
        >
          Get in Touch
        </Typography>
        <Typography variant="body1" sx={{ color: "#4B5563" }}>
          Have feedback or a collaboration idea? Let’s talk.
          <br />
          <strong>connect@blogit.com</strong>
        </Typography>
      </Container>

      <Box sx={{ bgcolor: "#064420", py: 3, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
          &copy; {new Date().getFullYear()} BlogIt. Empowering storytellers —
          built by @maishMw.
        </Typography>
      </Box>
    </Box>
  );
}
