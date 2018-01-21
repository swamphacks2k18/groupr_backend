const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    locationName: String,
    latitude: Number,
    longitude: Number,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;