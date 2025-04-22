import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    // validate(value: string) {
    //   if (!value.match(/.+@.+\..+/)) {
    //     throw new Error("Email is invalid");
    //   }
    // },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 1, // ändra till högre värde senare
    // validate(value: string) {
    //   if (value.length < 6) {
    //     throw new Error("Password must be at least 6 characters long");
    //   }
    //   if (value.toLowerCase().includes("password")) {
    //     throw new Error("Password cannot contain 'password'");
    //   }
    // },
  },
  auctions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
    },
  ],
});

export const UserModel = mongoose.model("User", userSchema);
