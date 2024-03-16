const express = require('express');
const router = express.Router();
const roomsModel = require('../DataModels/rooms');

router.post('/', async (req, res) => {
  try {
    const { roomId, userId, userName, nomadRating, revMsg } = req.body;

    const existingReview = await roomsModel.findOne({ _id: roomId, 'reviews.userId': userId });

    if (existingReview) {
      await roomsModel.findOneAndUpdate(
        { _id: roomId, 'reviews.userId': userId },
        { $set: { 'reviews.$': { userId, userName, nomadRating, revMsg } } },
        { new: true }
      );

      return res.status(200).json('Thank you for review');
    } else {
      await roomsModel.findByIdAndUpdate(
        roomId,
        { $push: { reviews: { userId, userName, nomadRating, revMsg } } },
        { new: true }
      );

      return res.status(201).json('Thank you for review');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
