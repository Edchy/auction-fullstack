import { RequestHandler } from "express";
import { UserModel } from "../models/userModel.mjs";

// get all
export const getUsers: RequestHandler = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
};

export const getUserById: RequestHandler = async (req, res) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
};
