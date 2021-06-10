var mongoose = require("mongoose");

var billSchema = new mongoose.Schema({
    customer_id: String,
    date: {
        type: Date,
        default: new Date()
    },
    total_payment: Number
});

var Bill = mongoose.model("Bill", billSchema, "bill");

module.exports = Bill;
