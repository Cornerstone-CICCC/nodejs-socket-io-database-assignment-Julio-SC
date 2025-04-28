"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
const room_controller_1 = require("../controllers/room.controller");
const roomHandler = (io) => {
    // Socket.io events
    io.on('connection', (socket) => {
        console.log(`${socket.id} has joined`);
        (0, room_controller_1.handleRoomEvents)(io, socket);
    });
};
exports.roomHandler = roomHandler;
