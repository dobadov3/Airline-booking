var mongoose = require('mongoose');

var flightSchema = new mongoose.Schema({
    from_airport_id: String,
    to_airport_id: String,
    depart_time: Date,
    arrival: Date,
    airbus_id: String, 
    carrier_id: String, 
    status_id: String
});

var Flight = mongoose.model('Flight', flightSchema, 'flight');

module.exports = Flight;