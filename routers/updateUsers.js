const express = require('express');
const router = express.Router();
const User = require('../DataModels/users'); 

router.post('/updateUser', async (req, res) => {
  try {
    const userData = req.body;
    console.log('Incoming joinedRooms:', userData.userInfo.joinedRooms);

    const result = await User.findByIdAndUpdate(userData.userInfo._id, { joinedRooms: userData.userInfo.joinedRooms });
    console.log('Update Result:', result);

    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


router.get('/getUserData', async (req, res) => {
  try {
    const user = await User.findById(req.query.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


module.exports = router;
