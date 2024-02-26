const express = require('express');
const router = express.Router();
const RoomModel = require('../DataModels/rooms');

router.get('/:roomId', async (req, res) => {
    const {roomId} = req.params;
    console.log(roomId)
  try {
    const room = await RoomModel.findOne({_id:roomId});
    const chats = room.chat;
    const chatsArray = Array.isArray(chats) ? chats : [chats];
    console.log(chatsArray);
    res.status(200).json(chatsArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
