"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoomEvents = void 0;
const chat_model_1 = require("../models/chat.model"); // 👈 Importa tu modelo Chat
const handleRoomEvents = (io, socket) => {
    socket.on('disconnect', () => {
        console.log(`${socket.id} has disconnected...`);
    });
    socket.on('chat', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Guardar en MongoDB
            const chat = new chat_model_1.Chat({
                username: data.username,
                message: data.message,
                room: data.room // También guardamos a qué sala pertenece
            });
            yield chat.save();
            // Emitir mensaje a la sala
            io.to(data.room).emit('chat', data);
        }
        catch (error) {
            console.error('Error saving chat to MongoDB:', error);
        }
    }));
    socket.on('join room', (data) => {
        socket.join(data.room);
        console.log(`${data.username} has joined the ${data.room}`);
        io.to(data.room).emit('chat', {
            username: 'System',
            message: `${data.username} joined the room`,
            room: data.room
        });
    });
    socket.on('leave room', (data) => {
        socket.leave(data.room);
        console.log(`${data.username} left ${data.room}`);
        io.to(data.room).emit('chat', {
            username: 'System',
            message: `${data.username} has left chat.`,
            room: data.room
        });
    });
};
exports.handleRoomEvents = handleRoomEvents;
