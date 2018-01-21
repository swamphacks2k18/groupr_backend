const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    latitude: Number,
    longitude: Number,
    name: String,
    class: String,
    description: String,
    startTime: Date,
    endTime: Date,
    locationKey: String,
    owner: String,
    members: [{type:String}]
})

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;