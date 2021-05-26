var mongoose = require('mongoose');

var scheduleSchema = new mongoose.Schema({
    from_airport_id: String,
    to_airport_id: String,
    depart_time: Date,
    arrival: Date,
    airbus_id: String,  
    status_id: String,
    ticket_ammount: Number
});

var Schedule = mongoose.model("Schedule", scheduleSchema, "schedule");

module.exports = Schedule;