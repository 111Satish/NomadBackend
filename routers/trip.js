const express = require('express');
const router = express.Router();
const Trip = require('../DataModels/trips');
const User = require('../DataModels/users');

router.post('/create', async (req, res) => {
    const {
        isTrip,
        name,
        destination,
        departureDate,
        returnDate,
        notes,
        activities,
        expectedExpense,
        creator,
        members
    } = req.body;

    try {
        const creatorUser = await User.findById(creator);
        if (!creatorUser) {
            return res.status(404).json({ message: 'Creator not found' });
        }

        const tripData = {
            isTrip,
            name,
            destination,
            departureDate,
            returnDate,
            notes,
            activities,
            expectedExpense,
            creator,
            members
        };

        const newTrip = new Trip(tripData);
        const savedTrip = await newTrip.save();

        const tripId = savedTrip._id;

        for (const member of members) {
            const updatedUser = await User.findByIdAndUpdate(
                member._id,
                {
                    $push: {
                        trips: tripId
                    }
                },
                { new: true }
            );
        }

        res.status(201).json(savedTrip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const tripId = req.params.id;

    try {
        const tripToDelete = await Trip.findById(tripId);
        if (!tripToDelete) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        const members = tripToDelete.members;
        for (const member of members) {
            await User.findByIdAndUpdate(
                member,
                {
                    $pull: {
                        trips: tripId
                    }
                },
                { new: true }
            );
        }

        await Trip.findByIdAndDelete(tripId);

        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/searchMember', async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ userEmail: email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const tripIds = user.trips;

        const trips = await Trip.find({ _id: { $in: tripIds }, isTrip: true });

        res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/user/splitbills/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const tripIds = user.trips;

        const trips = await Trip.find({ _id: { $in: tripIds } });
        console.log(trips)
        res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
