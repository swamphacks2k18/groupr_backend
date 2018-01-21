const Location = require('./locationsModel.js');

module.exports = {
    get: async function(req, res) {
        let locations = await Location.find();
        console.log(locations)
        res.status(200).send({ localLocations: locations });
    }
}