import { RequestHandler } from "express";
import { UserModel } from "../models/userModel.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { expirationTimeMs } from "../constants.mjs";

export const login: RequestHandler = async (req, res) => {
  console.log("Login request received");
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user);

    if (!user) {
      res.status(404).json("User not found lol");
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json("Password is incorrect");
      return;
    }

    const token = jwt.sign({ id: user.id }, "sosecret", {
      expiresIn: expirationTimeMs,
    });

    res.cookie("loginKaka", token, {
      httpOnly: true,
      maxAge: expirationTimeMs,
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
