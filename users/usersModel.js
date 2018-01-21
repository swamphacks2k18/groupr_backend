const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: String,
    password: String,
    activeSessions: [{
        type:mongoose.Schema.Types.ObjectId,
        default: []
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
