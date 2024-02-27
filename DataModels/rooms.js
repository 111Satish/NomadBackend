const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    message: {
        type: String, 
        required: true
    }
});

const areasSchema = new mongoose.Schema({
    Area_name: String,
    Rating: Number,
    Description: String,
    Image_url: String,
    chat: [chatSchema] 
});

module.exports = mongoose.model('rooms', areasSchema);
