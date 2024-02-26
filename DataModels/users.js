
require('../config');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName : String,
    userEmail: String,
    userPassword : String,
    joinedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'areas' }],
});

module.exports = mongoose.model('users', UserSchema);
