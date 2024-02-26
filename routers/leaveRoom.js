const express = require('express');
const router = express.Router();
const UserModel = require('../DataModels/users');
const RoomModel = require('../DataModels/rooms');

router.post('/:roomId/leave', async (req, res) => {
    const { userId } = req.body;
    const { roomId } = req.params;

    try {
        const user = await UserModel.findById(userId);

        console.log("Checking the data");
        console.log(user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.joinedRooms.includes(roomId)) {
            return res.status(400).json({ error: 'User is not part of the room' });
        }

        user.joinedRooms = user.joinedRooms.filter(room => room != roomId);
        await user.save();
        console.log(user.joinedRooms);
        res.status(200).json({ message: 'Room left successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;