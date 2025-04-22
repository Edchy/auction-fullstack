import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.mjs";
import registerRouter from "./routes/registerRoute.mjs";
import loginRouter from "./routes/loginRoute.mjs";
import cookieParser from "cookie-parser";
import auctionRouter from "./routes/auctionRoute.mjs";
import bidRouter from "./routes/bidRouter.mjs";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { initSocket } from "./sockets.mjs";
import authRouter from "./routes/authRoute.mjs";
import { io } from "./sockets.mjs";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/auctions", auctionRouter);
app.use("/bid", bidRouter);

// Skapa HTTP-server
export const server = http.createServer(app);

// Initiera Socket.io
initSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://leAuction:1234@cluster0.lxm2o.mongodb.net/theAuction?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Servern körs på port ${PORT}, ansluten till MongoDB`);
  } catch (error) {
    console.error("Fel vid anslutning till MongoDB:", error);
  }
});
