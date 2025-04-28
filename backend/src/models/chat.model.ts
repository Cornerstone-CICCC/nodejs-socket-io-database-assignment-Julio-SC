import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  username: String,
  message: String,
  room: String
}, { timestamps: true }); // <- 🔥 timestamps activados

export const Chat = mongoose.model('Chat', chatSchema);
