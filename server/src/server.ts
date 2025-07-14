import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://blog-it-fullstack.vercel.app","https://super-centaur-625704.netlify.app", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);

app.get("/", (_, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
