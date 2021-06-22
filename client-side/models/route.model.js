var mongoose = require("mongoose");
const Airport = require('./airport.model');
const RouteDetail = require('./route_detail.model')

var routeSchema = new mongoose.Schema({
    depart_airport_id: {
        type: String,
        ref: "Airport",
    },
    arrival_airport_id: {
        type: String,
        ref: "Airport",
    },
    depart_time: Date,
    arrival_time: Date,
    code: String,
    price: Number,
    status_id: {
        type: String,
        ref: "Status"
    },
});

routeSchema.virtual("dTime").get(function () {
    var m = this.depart_time.getMonth() + 1;
    var d = this.depart_time.getDate();
    var y = this.depart_time.getFullYear();
    var h = this.depart_time.getHours();
    var mn = this.depart_time.getMinutes();

    if (mn === 0){
        mn = '00'
    }

    if (h === 0){
        h = '00'
    }

    return `${d}/${m}/${y} ${h}:${mn}`;
});
routeSchema.virtual("aTime").get(function () {
    var m = this.arrival_time.getMonth() + 1;
    var d = this.arrival_time.getDate();
    var y = this.arrival_time.getFullYear();
    var h = this.arrival_time.getHours();
    var mn = this.arrival_time.getMinutes();

    if (mn === 0){
        mn = '00'
    }

    if (h === 0){
        h = '00'
    }

    return `${d}/${m}/${y} ${h}:${mn}`;
});

routeSchema.post("remove", async function (doc) {
    var routeDetail = await RouteDetail.find({ route_id: doc._id });

    for (let i = 0; i < routeDetail.length; i++) {
        await RouteDetail.findByIdAndDelete(routeDetail[i]._id);
    }
});


var Route = mongoose.model("Route", routeSchema, "route");

module.exports = Route;
