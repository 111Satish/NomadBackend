const express = require('express');
const router = express.Router();
const Room = require('../DataModels/rooms');
const socketIo = require('socket.io');

const io = socketIo();

io.on('connection', (socket) => {
  console.log('A user connected to the socket.');

  socket.on('disconnect', () => {
    console.log('A user disconnected from the socket.');
  });
});

router.post('/chat', async (req, res) => {
  try {
    const { roomId, userId, name, time, message } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        $push: {
          chat: { userId, name, time, message }
        }
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    io.to(roomId).emit('message', { userId, name, time, message });

    res.json({ success: true, message: 'Chat message added successfully' });
  } catch (error) {
    console.error('Error adding chat message:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = { router, io };
