const Airport = require('../models/airport.model');

module.exports.getAirport = async function (req, res) {
    var airports = await Airport.find();

    res.render("./airports/index", {
        airports
    });
};

module.exports.postCreate = async function (req, res) {
    var airport = new Airport(req.body);

    Airport.create(airport);

    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var airportId = req.params.airportId;
    var airport = await Airport.findById(airportId);
    res.render("./airports/edit", {
        airport,
    });
};

module.exports.postEdit = async function (req, res) {
    var airportId = req.params.airportId;

    var airport = await Airport.findById(airportId);

    airport.name = req.body.name;
    airport.code = req.body.code;
    airport.country = req.body.country;
    airport.city = req.body.city;

    airport.markModified("name");
    airport.markModified("code");
    airport.markModified("city");
    airport.markModified("country");

    await airport.save();

    res.redirect("/airports");  
};

module.exports.delete = async function (req, res) {
    var airportId = req.params.airportId;

    await Airport.findOneAndRemove({ _id: airportId });

    res.redirect("back");
};
