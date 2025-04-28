import { Server } from "socket.io";
import { handleRoomEvents } from "../controllers/room.controller"

export const roomHandler = (io: Server) => {
  // Socket.io events
  io.on('connection', (socket) => {
    console.log(`${socket.id} has joined`)
    handleRoomEvents(io, socket)
  })
}