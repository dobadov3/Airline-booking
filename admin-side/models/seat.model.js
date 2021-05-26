var mongoose = require("mongoose");

var seatSchema = new mongoose.Schema({
    ticket_id: String,
    airbus_id: String,
    status: String, 
    price: Number
});

var Seat = mongoose.model("Seat", seatSchema, "seat");

module.exports = Seat;
