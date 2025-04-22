import { Router } from "express";
import { register } from "../controllers/registerController.mjs";
const registerRouter = Router();

registerRouter.post("/", register);

export default registerRouter;
