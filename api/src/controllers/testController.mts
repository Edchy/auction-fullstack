import { Request, Response } from "express";
import { Bid } from "../models/bidSchema.mjs";
import mongoose from "mongoose";

export const testBidSpeed = async (req: Request, res: Response) => {
  const start = performance.now();

  try {
    const fakeBid = await Bid.create({
      auction: new mongoose.Types.ObjectId(), // Fake auction
      bidder: new mongoose.Types.ObjectId(), // Fake user
      amount: Math.floor(Math.random() * 1000 + 100), // Random amount
    });

    const end = performance.now();
    const duration = end - start;

    res.status(201).json({
      message: "Bid created",
      bid: fakeBid,
      durationMs: duration.toFixed(2), // How long it took (ms)
    });
  } catch (error) {
    res.status(500).json({
      message: "Error testing bid creation",
      error: (error as Error).message,
    });
  }
};
