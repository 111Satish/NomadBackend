const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users', 
    //     required: true
    // },
    type: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('feedback', feedbackSchema);
