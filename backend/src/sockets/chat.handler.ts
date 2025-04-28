import { Server, Socket } from 'socket.io';
import { Chat } from '../models/chat.model';

const setupChatSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('chat', async (data) => {
      const { username, message, room } = data;

      try {
        const chat = new Chat({
          username,
          message,
          room: room || ''
        });
        await chat.save();

        if (!room) {
          io.emit('chat', {
            _id: chat._id, // ⬅️ Emitimos el ID también
            username: chat.username,
            message: chat.message
          });
        }
        // Si el mensaje es de un room, no emitimos aquí. Solo en room.controller.
        
      } catch (error) {
        console.error('Error saving chat:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default setupChatSocket;
