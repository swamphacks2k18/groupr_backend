const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String,
    activeSessions: [{type:mongoose.Schema.Types.ObjectId}] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;

"latitude": 29.647984,
  "longitude": -82.344002

"latitude": 29.651435,
  "longitude": -82.342916

"latitude": 29.649207,
  "longitude": -82.343624

"latitude": 29.646279,
  "longitude": -82.347754

"latitude": 29.64659,
  "longitude": -82.337837