import { Router } from "express";
import { getUsers, getUserById } from "../controllers/userController.mjs";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);

export default userRouter;
