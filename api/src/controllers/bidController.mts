import { Request, Response } from "express";
import { Bid } from "../models/bidSchema.mjs";
import { AuctionModel } from "../models/auctionModel.mjs";
import { io } from "../sockets.mjs";
import { UserModel } from "../models/userModel.mjs";

// Add before createBid function
async function getUserName(userId: string) {
  const user = await UserModel.findById(userId);
  return user ? user.name : "Unknown User";
}

export const createBid = async (req: Request, res: Response) => {
  const { auctionId, amount } = req.body;

  const bidderId = req.user._id;
  // console.log(req.user._id);

  console.log("req params", req.params);
  console.log(req.body);
  console.log(auctionId, bidderId, amount);

  if (!auctionId || !bidderId || !amount) {
    res.status(400).json({ message: "Please fill all fields" });
    return;
  }
  const auctionWithVersion = await AuctionModel.findById(auctionId).select(
    "__v"
  );
  if (!auctionWithVersion) {
    res.status(404).json({ message: "Auction not found" });
    return;
  }
  console.log(auctionWithVersion);
  try {
    // Create the bid
    const bid = await Bid.create({
      auction: auctionId,
      bidder: bidderId,
      amount,
    });

    // Use findOneAndUpdate with optimistic concurrency control
    const updatedAuction = await AuctionModel.findOneAndUpdate(
      // find doc where all conditions are met
      // auction is active, auction is not ended, sellerId is !== bidderId, current price is less than amount
      {
        _id: auctionId,
        __v: auctionWithVersion.__v, // use current version as a condition
        status: "active",
        endDate: { $gt: new Date() }, // Ensure auction is not ended
        seller: { $ne: bidderId }, // Prevent seller from bidding
        currentPrice: { $lt: amount }, // Ensure new bid is higher
      },
      {
        $set: { currentPrice: amount },
        $push: { bids: bid._id },
        $inc: { __v: 1 }, // Increment version for OCC
      },
      // Options - return the updated document, run schema validators on update
      { new: true, runValidators: true }
    );

    if (!updatedAuction) {
      await Bid.findByIdAndDelete(bid._id);

      // tror 409 är rätt här istället för 400...
      res.status(409).json({
        message:
          "Invalid bid - auction not found, ended, or bid too low. Bid conflict — auction state changed. Try again.",
      });
      return;
    }
    console.log(updatedAuction);

    res.status(201).json({
      message: "Bid created successfully",
      bid,
    });

    const bidderName = await getUserName(bidderId);
    // Emit the new bid to the auction room
    io.to(`auction-${auctionId}`).emit("newBid", {
      auctionId: auctionId,
      newBid: {
        _id: bid._id,
        amount: amount,
        bidder: {
          _id: bidderId,
          name: bidderName, // You'll need to implement this helper function
        },
        createdAt: bid.createdAt,
      },
      currentPrice: amount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating bid",
      error: (error as Error).message,
    });
  }
};

export const getAllBids = async (req: Request, res: Response) => {
  const bids = await Bid.find()
    .populate("auction")
    .populate("bidder", "name email")
    .sort({ createdAt: -1 });
  res.status(200).json(bids);
};
