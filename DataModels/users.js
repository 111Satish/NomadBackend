const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String,
    city: String,
    mobile: String,
    profession: String,
    dateOfBirth: Date,
    joinedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rooms' }],
    trips:[{type: mongoose.Schema.Types.ObjectId, ref: 'trips'}]
});

module.exports = mongoose.model('users', UserSchema);
