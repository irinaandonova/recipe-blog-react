const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 30
    },
    password: {
        type: String, 
        required: true,
        minLength: 6,
        maxLength: 16
    },
    recepes: {
        type: Array,
        required: true
    },
    likedRecepes: {
        type: Array,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
exports.module = User;