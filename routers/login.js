const express = require('express');
const router = express.Router();
const UserModel = require('../DataModels/users');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
console.log(userEmail);
    
    const existingUser = await UserModel.findOne({ userEmail });
    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid credentials' }); 
    }

    const passwordMatch = await UserModel.findOne({ userEmail, userPassword });
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: passwordMatch._id }, 'yourSecretKey',); 

    res.status(200).json({ token, userInfo: passwordMatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
