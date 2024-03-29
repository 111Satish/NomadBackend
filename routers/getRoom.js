const express = require('express');
const router = express.Router();
const RoomModel = require('../DataModels/rooms');

router.post('/', async (req, res) => {
  try {
    const rooms = await RoomModel.find({}, 'roomName imageUrl description rating');
    //console.log(rooms);
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
