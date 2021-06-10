var mongoose = require("mongoose");

var routeSchema = new mongoose.Schema({
    depart_airport_id: String,
    arrival_airport_id: String,
    price: Number
});

var Route = mongoose.model("Route", routeSchema, "route");

module.exports = Route;
