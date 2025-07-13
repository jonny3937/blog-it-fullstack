import { Router } from "express";
import { 
  getAllBlogs, 
  createBlog, 
  getBlogById, 
  updateBlog, 
  deleteBlog 
} from "../controllers/blog.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateToken, getAllBlogs);
router.post("/", authenticateToken, createBlog);
router.get("/:id", getBlogById);
router.put("/:id", authenticateToken, updateBlog);
router.delete("/:id", authenticateToken, deleteBlog);

export default router; 