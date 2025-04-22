// In a new file like authRoutes.mts
import { Router } from "express";
import { auth } from "../mw/auth.mjs";

const authRouter = Router();

authRouter.get("/me", auth, (req, res) => {
  res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

export default authRouter;
