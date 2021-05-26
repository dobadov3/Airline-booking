var mongoose = require('mongoose');

var airbusSchema = new mongoose.Schema({
    name: String,
    code: String,
    seatNum: Number,
    carrier_id: String,
});

var Airbus = mongoose.model('Airbus', airbusSchema, 'airbus');

module.exports = Airbus;