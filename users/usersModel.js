const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String,
    activeSessions: [{type:mongoose.Schema.Types.ObjectId}] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;