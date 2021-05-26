var mongoose = require("mongoose");

var ticketSchema = new mongoose.Schema({
    customer_id: String, 
    schedule_id: String,
    seat_id: String,
    
});

var Ticket = mongoose.model("Ticket", ticketSchema, "ticket");

module.exports = Ticket;
