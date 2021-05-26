var mongoose = require("mongoose");

var billInfoSchema = new mongoose.Schema({
    customer_id: String,
    datetime: Date,
    total_payment: Number,
});

var BillInfo = mongoose.model("BillInfo", billInfoSchema, "bill_info");

module.exports = BillInfo;
