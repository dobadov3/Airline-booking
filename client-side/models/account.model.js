var mongoose = require("mongoose");

var accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    role_id: String,
    name: String,
    date_of_birth: Date,
    email: String,
    phone: String,
    gender: String,
});

var Account = mongoose.model("Account", accountSchema, "account");

module.exports = Account;
