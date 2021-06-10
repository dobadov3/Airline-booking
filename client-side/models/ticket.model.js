var mongoose = require("mongoose");

var ticketSchema = new mongoose.Schema({
    route_id: String,
    ticket_class_id: String,
    price: Number,
    status: String
});

var Ticket = mongoose.model("Ticket", ticketSchema, "ticket");

module.exports = Ticket;
