import { Server } from "socket.io";
import http from "http";
import { AuctionModel } from "./models/auctionModel.mjs";

export let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    // Join auction room when client views an auction
    socket.on("joinAuction", (auctionId) => {
      socket.join(`auction-${auctionId}`);
      console.log(
        `Client ${socket.id} joined auction room: auction-${auctionId}`
      );
    });

    // Leave auction room
    socket.on("leaveAuction", (auctionId) => {
      socket.leave(`auction-${auctionId}`);
      console.log(
        `Client ${socket.id} left auction room: auction-${auctionId}`
      );
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
};

// export const getIO = () => {
//   if (!io) throw new Error("Socket.io har inte initierats!");
//   return io;
// };
