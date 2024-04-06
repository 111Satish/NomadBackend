const express = require('express');
const router = express.Router();
const Trip = require('../DataModels/trips');
const User = require('../DataModels/users');

router.post('/add/:tripId', async (req, res) => {
    const { _id, paidby, notes, amount, date, members} = req.body;

    const tripId = req.params.tripId;
    try {
        const expenseInfo = { _id, paidby, notes, amount, date, members };

        console.log(tripId)
        console.log(expenseInfo)
        const updatedTrip = await Trip.findByIdAndUpdate(
            tripId,
            {
                $push: {
                    expenses: expenseInfo 
                }
            },
            { new: true }
        );
       
        res.status(201).json(updatedTrip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/get/:tripId', async (req, res) => {
    const { tripId } = req.params;

    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json(trip.expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
