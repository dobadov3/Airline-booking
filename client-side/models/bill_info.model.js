var mongoose = require("mongoose");

var billInfoSchema = new mongoose.Schema({
    bill_id: String, 
    ticket_id: String,
    quantity: Number
});

var BillInfo = mongoose.model("BillInfo", billInfoSchema, "bill_info");

module.exports = BillInfo;
