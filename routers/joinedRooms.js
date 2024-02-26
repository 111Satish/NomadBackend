const express = require('express');
const router = express.Router();
const UserModel = require('../DataModels/users');
const RoomModel = require('../DataModels/rooms');

router.post('/:roomId/join', async (req, res) => {
    const { userId } = req.body;
    const { roomId } = req.params;
    console.log(userId);
    console.log(roomId);
    try {
        const user = await UserModel.findById(userId);
        const room = await RoomModel.findById(roomId);

        console.log("Checking the data");
        console.log(user, room);

        if (!user || !room) {
            return res.status(404).json({ error: 'User or Room not found' });
        }

        if (user.joinedRooms.includes(roomId)) {
            return res.status(201).json({ error: 'User has already joined the room' });
        }

        user.joinedRooms.push(roomId);
        await user.save();

        res.status(200).json({ message: 'Room joined successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
