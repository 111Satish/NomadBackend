const express = require('express');
const router = express.Router();
const RoomModel = require('../DataModels/rooms');

router.get('/', async (req, res) => {
  try {
    const rooms = await RoomModel.find({}, 'roomName imageUrl description rating');
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error occurred while fetching rooms', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    console.log(searchTerm);
    const rooms = await RoomModel.find({
      $or: [
        { roomName: { $regex: searchTerm, $options: 'i' } }, 
        { description: { $regex: searchTerm, $options: 'i' } }, 
      ]
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error occurred while searching', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
