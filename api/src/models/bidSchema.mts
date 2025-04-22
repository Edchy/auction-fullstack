import mongoose, { Schema, model } from "mongoose";

export type BidData = {
  auctionId: mongoose.Types.ObjectId; // or string;
  userId: mongoose.Types.ObjectId; // or string;
  amount: number;
};

export const BidSchema = new Schema(
  {
    auction: {
      type: Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
    },
    bidder: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
      // validate: {
      //   validator: function (value: number) {
      //     return value > 0;
      //   },
      //   message: "Bid amount must be greater than zero",
      // },
    },
  },
  {
    timestamps: true, // Automatically adds "createdAt" and "updatedAt"
  }
);

BidSchema.index({ auction: 1, amount: -1 });
BidSchema.index({ bidder: 1, createdAt: -1 });

export const Bid = model("Bid", BidSchema);
