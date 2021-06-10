var mongoose = require("mongoose");

var billDetailSchema = new mongoose.Schema({
    bill_id: String,
    ticket_id: String
});

var BillDetail = mongoose.model("BillDetail", billDetailSchema, "bill_detail");

module.exports = BillDetail;
