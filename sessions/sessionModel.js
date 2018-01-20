const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    latitude: String,
    longitude: String,
    name: String,
    class: String,
    description: String,
    startTime: String,
    endTime: String,
    locationKey: String,
    owner: String,
    members: [{type:String}]
})

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;