import { Request, Response } from "express";
import { IUser, User } from "../user/user.model";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const user: IUser = await User.create({ name, email, password, role });

  res.status(201).json({
    message: "Registered successfully",
    token: generateToken(user._id.toString(), user.role),
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: IUser | null = await User.findOne({ email });
  if (!user || user.isBlocked || !(await user.comparePassword(password))) {
    return res
      .status(401)
      .json({ message: "Invalid credentials or user blocked" });
  }

  res.json({
    message: "Login successful",
    token: generateToken(user._id.toString(), user.role),
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
