const Route = require('../models/route.model');
const Airport = require('../models/airport.model');
const RouteDetail = require('../models/route_detail.model');
const Airplane = require('../models/airplane.model')

module.exports.get = async function (req, res) {
    var routes = await Route.find();

    for (let i = 0; i < routes.length; i++) {
        var depart_airport = await Airport.findById(routes[i].depart_airport_id)
        var arrival_airport = await Airport.findById(routes[i].arrival_airport_id)

        routes[i].depart_airport = depart_airport.code;
        routes[i].arrival_airport = arrival_airport.code;
    }

    var link = "/flights/booking/one-way"

    res.render("./flight/index", {
        routes,
        link,
    });
};

module.exports.search = async function(req, res){
    var { type_route, depart_airport_id, arrival_airport_id, depart_time, arrival_time } = req.query;

    var routes = await Route.find({ depart_airport_id, arrival_airport_id, depart_time: {$gte: depart_time} });

    if (type_route === "one-way"){
        var link = "/flights/booking/one-way";
        for (let i = 0; i < routes.length; i++) {
            var depart_airport = await Airport.findById(
                routes[i].depart_airport_id
            );
            var arrival_airport = await Airport.findById(
                routes[i].arrival_airport_id
            );

            routes[i].depart_airport = depart_airport.code;
            routes[i].arrival_airport = arrival_airport.code;
        }
    }else{
        var link = "/flights/booking/round-trip";
        var route2 = await Route.findOne({
            depart_airport_id: arrival_airport_id,
            arrival_airport_id: depart_airport_id,
            depart_time: { $gte: arrival_time },
        });

        if (!route2){
            routes = null
        }else{
            for (let i = 0; i < routes.length; i++) {
                var depart_airport = await Airport.findById(
                    routes[i].depart_airport_id
                );
                var arrival_airport = await Airport.findById(
                    routes[i].arrival_airport_id
                );

                routes[i].round_trip = route2;

                routes[i].depart_airport = depart_airport.code;
                routes[i].arrival_airport = arrival_airport.code;
            }
        }
    }

    res.render("./flight/index", {
        routes,
        link,
        type_route,
    });
}

module.exports.oneWay = async function(req, res){
    var {route_id} = req.query;

    var route = await Route.findById(route_id);

    var route_detail = await RouteDetail.find({route_id})
        .populate('airplane_id')

    var depart_airport = await Airport.findById(route.depart_airport_id);
    var arrival_airport = await Airport.findById(route.arrival_airport_id);

    res.render("./flight/booking-oneway", {
        route,
        route_detail,
        depart_airport,
        arrival_airport,
    });
}

module.exports.roundTrip = async function (req, res) {
    console.log(req.query)
    res.render("./flight/booking-roundtrip");
};