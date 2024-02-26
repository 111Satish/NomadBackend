const express = require('express');
const router = express.Router();
const Room = require('../DataModels/rooms');
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected to the socket.');

  socket.on('disconnect', () => {
    console.log('A user disconnected from the socket.');
  });
});

router.post('/chat', async (req, res) => {
  try {
    const { roomId, userId, name, time, message } = req.body;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const newChatMessage = {
      userId,
      name,
      time,
      message,
    };

    room.chat.push(newChatMessage);
    await room.save();

    io.to(roomId).emit('message', newChatMessage);

    res.json({ success: true, message: 'Chat message added successfully' });
  } catch (error) {
    console.error('Error adding chat message:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = { router, server };
