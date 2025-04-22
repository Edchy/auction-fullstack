import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.mjs";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth: RequestHandler = async (req, res, next) => {
  console.log("Auth middleware triggered");
  console.log("Request cookies:", req.cookies);
  try {
    const token = req.cookies.loginKaka;

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const decoded = jwt.verify(token, "sosecret") as JwtPayload;
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid authentication" });
  }
};
