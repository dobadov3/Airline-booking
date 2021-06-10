var mongoose = require("mongoose");

var airplaneCompanySchema = new mongoose.Schema({
    name: String
});

var AirplaneCompany = mongoose.model("AirplaneCompany", airplaneCompanySchema, "airplane_company");

module.exports = AirplaneCompany;
