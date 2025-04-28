import { Server, Socket } from 'socket.io'
import { Chat } from '../models/chat.model' // 👈 Importa tu modelo Chat

export const handleRoomEvents = (io: Server, socket: Socket) => {
  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected...`)
  })

  socket.on('chat', async (data) => {
    try {
      // Guardar en MongoDB
      const chat = new Chat({
        username: data.username,
        message: data.message,
        room: data.room // También guardamos a qué sala pertenece
      });
      await chat.save();

      // Emitir mensaje a la sala
      io.to(data.room).emit('chat', data);
    } catch (error) {
      console.error('Error saving chat to MongoDB:', error);
    }
  })

  socket.on('join room', (data) => {
    socket.join(data.room)
    console.log(`${data.username} has joined the ${data.room}`)
    io.to(data.room).emit('chat', {
      username: 'System',
      message: `${data.username} joined the room`,
      room: data.room
    })
  })

  socket.on('leave room', (data) => {
    socket.leave(data.room)
    console.log(`${data.username} left ${data.room}`)
    io.to(data.room).emit('chat', {
      username: 'System',
      message: `${data.username} has left chat.`,
      room: data.room
    })
  })
}
