const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String
});

const User = mongoose.model('User', userSchema);

module.export = User;