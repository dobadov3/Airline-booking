var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    name: String,
    phone: String,
    country: String,
    date_of_birth: String,
});

var Customer = mongoose.model("Customer", customerSchema, "customer");

module.exports = Customer;