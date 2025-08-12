import { Request, Response } from "express";
import { User } from "./user.model";

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const blockUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked: true },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User blocked" });
};

export const unblockUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked: false },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User unblocked" });
};
