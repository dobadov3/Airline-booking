var mongoose = require('mongoose');

var airportSchema = new mongoose.Schema({
    name: String,
    code: String,
    city: String,
    country: String
});

var Airport = mongoose.model('Airport', airportSchema, 'airport');

module.exports = Airport;