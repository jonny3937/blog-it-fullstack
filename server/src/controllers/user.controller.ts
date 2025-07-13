import { Request, Response } from "express";
import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    const userId = (req as any).user.userId;

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
        NOT: { id: userId },
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = (req as any).user.userId;

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Check new password strength using zxcvbn
    const passwordStrength = zxcvbn(newPassword);
    if (passwordStrength.score < 2) {
      return res.status(400).json({
        message: "New password is too weak. Please choose a stronger password.",
        suggestions: passwordStrength.feedback.suggestions,
        warning: passwordStrength.feedback.warning,
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
