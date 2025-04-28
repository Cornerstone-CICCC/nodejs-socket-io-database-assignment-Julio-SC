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
exports.getMessagesByRoom = exports.getAllChats = void 0;
const chat_model_1 = require("../models/chat.model");
// Get all chats
const getAllChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chat_model_1.Chat.find({
            $or: [
                { room: { $exists: false } },
                { room: null },
                { room: '' }
            ]
        }).sort({ createdAt: 1 });
        res.json(chats);
    }
    catch (error) {
        console.error('Error fetching general chats:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getAllChats = getAllChats;
const getMessagesByRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomName = req.params.roomName;
        const chats = yield chat_model_1.Chat.find({ room: roomName }).sort({ createdAt: 1 });
        res.json(chats);
    }
    catch (error) {
        console.error('Error fetching room chats:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getMessagesByRoom = getMessagesByRoom;
exports.default = {
    getAllChats: exports.getAllChats,
    getMessagesByRoom: exports.getMessagesByRoom
};
