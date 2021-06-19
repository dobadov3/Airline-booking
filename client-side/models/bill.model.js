var mongoose = require("mongoose");
var moment = require("moment-timezone");

var billSchema = new mongoose.Schema({
    customer_id: String,
    date: Date,
    total_payment: Number,
    code: String,
    payment_status: {
        type: String,
        default: "Chưa thanh toán",
    },
    status_id: String,
});

billSchema.virtual("date_create").get(function () {
    var m = this.date.getMonth() + 1;
    var d = this.date.getDate();
    var y = this.date.getFullYear();
    return d + "/" + m + "/" + y;
});

var Bill = mongoose.model("Bill", billSchema, "bill");

module.exports = Bill;
