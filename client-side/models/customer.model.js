var mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({
    username: String, 
    password: String,
    name: String,
    date_of_birth: Date,
    email: String,
    phone: String,
    gender: String
});

var Customer = mongoose.model("Customer", customerSchema, "customer");

module.exports = Customer;
