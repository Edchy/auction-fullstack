import { io } from "socket.io-client";

export function socketInit(host: string, room: { name: string; id: string }) {
  const socket = io(host, {
    withCredentials: true,
  });
  // Join the room for this auction
  socket.emit(room.name, room.id);
  return socket;
}
