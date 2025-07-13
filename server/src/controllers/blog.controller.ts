import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(blogs);
  } catch (error) {
    console.error("Get blogs error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, synopsis, content, featuredImg } = req.body;
    const userId = (req as any).user.userId;

    const blog = await prisma.blog.create({
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Get blog error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, synopsis, content, featuredImg } = req.body;
    const userId = (req as any).user.userId;

    // Check if blog exists and belongs to user
    const existingBlog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (existingBlog.authorId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const blog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title,
        synopsis,
        content,
        featuredImg,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.json(blog);
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;

    // Check if blog exists and belongs to user
    const existingBlog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (existingBlog.authorId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.blog.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}; 