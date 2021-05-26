var mongoose = require('mongoose');

var planeSchema = new mongoose.Schema({
    name: String,
    code: String,
    seatNum: Number,
    id_carrier: String
});

var Plane = mongoose.model('Plane', planeSchema, 'plane');

module.exports = Plane;