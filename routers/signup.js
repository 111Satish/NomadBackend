const express = require('express');
const router = express.Router();
const UserModel = require('../DataModels/users');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    const existingUser = await UserModel.findOne({ userEmail });
    if (existingUser) {
      return res.status(409).json({ error: 'Account with this email already exists' });
    }

    
    const userData = { userName, userEmail, userPassword };
    const saveData = new UserModel(userData);
    const result = await saveData.save();

    const token = jwt.sign({ userId: result._id }, 'yourSecretKey');
    const data = { token, userInfo: result }; 

    res.status(201).json(data); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
