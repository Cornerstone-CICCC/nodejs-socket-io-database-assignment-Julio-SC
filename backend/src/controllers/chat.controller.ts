import { Request, Response } from 'express';
import { Chat } from '../models/chat.model';

// Get all chats
export const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find({ 
      $or: [
        { room: { $exists: false } }, 
        { room: null }, 
        { room: '' }
      ]
    }).sort({ createdAt: 1 });
    
    res.json(chats);
  } catch (error) {
    console.error('Error fetching general chats:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getMessagesByRoom = async (req: Request, res: Response) => {
  try {
    const roomName = req.params.roomName;
    const chats = await Chat.find({ room: roomName }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (error) {
    console.error('Error fetching room chats:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default {
  getAllChats,
  getMessagesByRoom
}