const Location = require('./locationsModel.js');

module.exports = {
    get: async function(req, res) {
        let locations = await Location.find();
        res.status(200).send({ localLocations: locations });
    }
}