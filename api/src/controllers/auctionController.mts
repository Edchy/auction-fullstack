import { AuctionModel } from "../models/auctionModel.mjs";
import { UserModel } from "../models/userModel.mjs";
import express, { Request, Response, RequestHandler } from "express";

const router = express.Router();

// GET: Hämta alla auktioner
export const getAllAuctions = async (req: Request, res: Response) => {
  try {
    const auctions = await AuctionModel.find().populate("seller", "name");
    res.json(auctions);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

export const getAuctionsByUserId: RequestHandler = async (req, res) => {
  console.log("Fetching auctions for user:", req.params.id);
  try {
    const userId = req.params.id;
    // populate()
    // tittar på userModelens auctions property som innehåller en array av auction ids
    // kollar på "ref" och ser att den refeerar till auctionModel
    // hämtar hela aution objektet baserat på id
    const user = await UserModel.findById(userId).populate("auctions");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user.auctions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching auctions",
      error: (error as Error).message,
    });
  }
};

export const getAuctionById = async (req: Request, res: Response) => {
  try {
    const auction = await AuctionModel.findById(req.params.id)
      .populate("seller", "name")
      .populate({
        path: "bids",
        select: "amount createdAt bidder", //
        options: { sort: { createdAt: -1 } }, // Most recent bids first
        populate: {
          path: "bidder",
          select: "name", // Just get the bidder's name
        },
      });
    if (!auction) {
      res.status(404).json({ message: "Auction not found" });
      return;
    }
    res.json(auction);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

// POST: Skapa en ny auktion
export const createAuction = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const auction = new AuctionModel({
    title: req.body.title,
    description: req.body.description,
    startingPrice: req.body.startingPrice,
    currentPrice: req.body.currentPrice,
    endDate: req.body.endDate,
    seller: userId,
    category: req.body.category,
    image: req.body.image,
  });

  try {
    const newAuction = await auction.save();

    await UserModel.findByIdAndUpdate(userId, {
      $push: { auctions: newAuction._id },
    });

    res.status(201).json(newAuction);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

// PUT: Uppdatera en auktion
export const updateAuction = async (req: Request, res: Response) => {
  try {
    const auction = await AuctionModel.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    auction.title = req.body.title || auction.title;
    // auction.description = req.body.description || auction.description;
    // auction.startingPrice = req.body.startingPrice || auction.startingPrice;
    //auction.currentPrice = req.body.currentPrice || auction.currentPrice;

    const updatedAuction = await auction.save();
    res.json(updatedAuction);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

// DELETE: Ta bort en auktion
export const deleteAuction = async (req: Request, res: Response) => {
  try {
    const auction = await AuctionModel.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    await AuctionModel.deleteOne({ _id: req.params.id });
    res.json({ message: "Auction deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

export default router;
