import { Router } from "express";
import {
  getAllAuctions,
  createAuction,
  getAuctionById,
  getAuctionsByUserId,
} from "../controllers/auctionController.mjs";
import { auth } from "../mw/auth.mjs";
const auctionRouter = Router();

auctionRouter.post("/", auth, createAuction);
auctionRouter.get("/", getAllAuctions);
auctionRouter.get("/:id", getAuctionById);
auctionRouter.get("/user/:id", getAuctionsByUserId);

export default auctionRouter;
