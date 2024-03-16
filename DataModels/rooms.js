const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
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

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    userName:{
        type:String,
        required: true,
    },
    nomadRating:{
        type: Number,
        required: true,
    },
    revMsg:{
        type: String,
        required: true
    }
});

const imgSchema = new mongoose.Schema({
    caption:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        required: true
    }
});

const roomsSchema = new mongoose.Schema({
    Area_name: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required:false
    },
    Description: {
        type: String,
        required: true,
    },
    Image_url: {
        type: String,
        required: false,
    },
    chat: [msgSchema] ,
    reviews: [reviewSchema],
    img:[imgSchema]
});

module.exports = mongoose.model('rooms', roomsSchema);
