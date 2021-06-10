var mongoose = require("mongoose");

var ticketClassSchema = new mongoose.Schema({
    name: String,
    multiply: mongoose.Schema.Types.Decimal128
});

var TicketClass = mongoose.model("TicketClass", ticketClassSchema, "ticket_class");

module.exports = TicketClass;
