const express = require('express');
const router = express.Router();
const FeedbackModel = require('../DataModels/feedback');

router.post('/', async (req, res) => {
    console.log("Feedback Called");
  try {
    const {type, feedback } = req.body;
    const userData = {type, feedback };
    console.log(userData);
    const saveData = new FeedbackModel(userData);
    await saveData.save();
    const data = "Thank you for your feedback!";
    res.status(201).json(data); 
    console.log(saveData)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
