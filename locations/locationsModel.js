const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    locationName: String,
    latitude: String,
    longitude: String, 
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;