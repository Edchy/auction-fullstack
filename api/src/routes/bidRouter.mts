import { Router } from "express";
import { createBid, getAllBids } from "../controllers/bidController.mjs";
import { testBidSpeed } from "../controllers/testController.mjs";
import { auth } from "../mw/auth.mjs";
const bidRouter = Router();

bidRouter.post("/", auth, createBid);
bidRouter.get("/", getAllBids);
bidRouter.post("/test-speed", testBidSpeed);

export default bidRouter;
