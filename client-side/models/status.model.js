var mongoose = require("mongoose");

var statusSchema = new mongoose.Schema({
    status_name: String, 
    Description: String
});

var Status = mongoose.model("Status", statusSchema, "status");

module.exports = Status;
