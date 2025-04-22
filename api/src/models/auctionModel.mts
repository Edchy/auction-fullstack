import { Schema, model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export const auctionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    startingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    endDate: {
      type: Date,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bid",
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    category: {
      type: String,
      required: true,
      enum: ["Whiskey", "Pokemoncards", "Electronics", "Furniture", "Other"],
      default: "Other",
    },
    image: {
      type: String,
      required: false,
      trim: true,
      default:
        "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Placeholder image URL
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true, // Lägger till "createdAt och updatedAt" automatiskt.
  }
);

// auctionSchema.plugin(updateIfCurrentPlugin);

export const AuctionModel = model("Auction", auctionSchema);
