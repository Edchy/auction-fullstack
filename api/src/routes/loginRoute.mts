import { Router } from "express";
import { login } from "../controllers/loginController.mjs";
const loginRouter = Router();

loginRouter.post("/", login);

export default loginRouter;
