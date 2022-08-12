const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxLength: 100
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Comment =  mongoose.model('Comment', commentSchema);

module.exports = Comment;

