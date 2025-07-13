import { Container } from "@mui/material";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <BlogForm />
      <BlogList />
    </Container>
  );
}
