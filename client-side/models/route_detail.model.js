var mongoose = require("mongoose");

var routeDetailSchema = new mongoose.Schema({
    route_id: String,
    airplane_id: String,
    depart_time: Date,
    arrival_time: Date,
    depart_airport_id: String,
    arrival_airport_id: String,
    status_id: String,
});

var RouteDetail = mongoose.model("RouteDetail", routeDetailSchema, "route_detail");

module.exports = RouteDetail;
