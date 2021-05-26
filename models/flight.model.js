var mongoose = require('mongoose');

var flightSchema = new mongoose.Schema({
    SBDen: String,
    SBDi: String,
    GioXuatPhat: Date,
    GioDen: Date,
    status: String,
    planeCode: String,
    ticketAmount: Number
});

var Flight = mongoose.model('Flight', flightSchema, 'flight');

module.exports = Flight;