import { RequestHandler } from "express";
import { UserModel } from "../models/userModel.mjs";
import bcrypt from "bcryptjs";

// Create a new user
export const register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({
        message: "Please fill in all fields",
      });
      return;
    }

    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
