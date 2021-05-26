var mongoose = require("mongoose");

var statusSchema = new mongoose.Schema({
    status_name: String, 
    description: String
});

var Status = mongoose.model("Status", statusSchema, "status");

module.exports = Status;
