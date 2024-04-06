const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,

    },
    cost: Number
})

const expenseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    paidby:{
        type:String,
        required:true
    },
    notes: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    members: [memberSchema]
})

const tripSchema = new mongoose.Schema({
    isTrip: Boolean,
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },

    notes: String,
    activities: String,
    expectedExpense: Number,

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    members: [memberSchema],
    expenses: [expenseSchema]
});

const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
