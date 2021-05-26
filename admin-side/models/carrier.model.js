var mongoose = require('mongoose');

var carrierSchema = new mongoose.Schema({
    name: String, 
    code: String
});

var Carrier = mongoose.model('Carrier', carrierSchema, 'carrier');

module.exports = Carrier;