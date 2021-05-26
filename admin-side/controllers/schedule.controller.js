const Schedule = require('../models/schedule.model');
const Airport = require("../models/airport.model");
const Airbus = require("../models/airbus.model");
const Carrier = require('../models/carrier.model');
const Status = require('../models/status.model');

module.exports.getSchedule = async function(req, res){
    var schedules = await Schedule.find();
    var airports = await Airport.find();
    var airbuses = await Airbus.find();

    if(schedules.length > 0){
        for (let i = 0; i < schedules.length; i++){
            var airbus = await Airbus.findById(schedules[i].airbus_id);
            var status = await Status.findById(schedules[i].status_id);

            schedules[i].airbus = airbus.name;
            schedules[i].status = status.status_name;

        }
    }

    res.render("./schedule/index", {
        schedules,
        airports,
        airbuses
    });
}

module.exports.postCreate = async function(req, res){
    var status = await Status.findOne({status_name: "Normal"});
    req.body.status_id = status._id;
    var schedule = new Schedule(req.body);

    Schedule.create(schedule);

    console.log(req.body)

    res.redirect('back');
}

module.exports.editFlight = async function(req, res){
    var scheduleID = req.params.scheduleID;

    var schedule = await Schedule.findById(scheduleID);

    await schedule.save()

    res.redirect("/admin/schedule/");
}

module.exports.getEditFlight = async function(req, res){
    var flightId = req.params.flightId
    var flight = await Flight.findById(flightId);
    var airports = await Airport.find();
    var planes = await Plane.find();

    var timeStart = new Date(flight.GioXuatPhat)
    var khoiHanh = timeStart.getFullYear() + '-' + (('0' + (timeStart.getMonth()+1)).slice(-2)) + '-' + timeStart.getDate() + 'T' + (('0' + timeStart.getHours()).slice(-2)) + ':' + (('0' + timeStart.getMinutes()).slice(-2))

    var timeArrived = new Date(flight.GioDen)
    var haCanh = timeArrived.getFullYear() + '-' + (('0' + (timeArrived.getMonth()+1)).slice(-2)) + '-' + timeArrived.getDate() + 'T' + (('0' + timeArrived.getHours()).slice(-2)) + ':' + (('0' + timeArrived.getMinutes()).slice(-2))

    res.render("./admin/schedule/edit", {
        flight,
        khoiHanh,
        haCanh,
        airports,
        planes,
    });
    console.log(khoiHanh)
}
