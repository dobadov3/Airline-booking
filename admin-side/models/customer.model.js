var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    name: String,
    phone: String,
    country: String,
    date_of_birth: String
});

var Account = mongoose.model('Account', accountSchema, 'account');

module.exports = Account;