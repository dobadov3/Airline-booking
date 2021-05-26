var Account = require('../models/account.model');
var md5 = require('md5');
var Flight = require('../models/flight.model');
var Airport = require('../models/airport.model');
var Plane = require('../models/plane.model');

const defaultPass = "admin123"

module.exports.get = function(req, res){
    res.render('./admin/layouts/layout')
}

module.exports.getUser = async function(req, res){
    var accounts = await Account.find();

    res.render('./admin/users/index', {
        accounts
    })
}

module.exports.create = async function(req, res){
    var name = req.body.fullName;
    var email = req.body.email;
    var tel = req.body.tel;
    var country = req.body.country;
    var date = req.body.date;
    var password = md5(defaultPass);
    var role = "admin"

    var user = new Account();
    user.name = name;
    user.email = email;
    user.phone = tel;
    user.country = country;
    user.date_of_birth = date;
    user.password = password;
    user.role = role;

    Account.create(user);

    res.redirect('back');
}

module.exports.deleteUser = async function(req, res){
    var userID = req.params.userID

    await Account.findOneAndRemove({_id: userID});


    res.redirect('back')
}

module.exports.getEditUser = async function(req, res){
    var userID = req.params.userID
    var account = await Account.findById(userID);
    res.render('./admin/users/edit', {
        account
    })
}

module.exports.editUser = async function(req, res){
    var userID = req.params.userID
    var name = req.body.fullName
    var email = req.body.email
    var phone = req.body.tel
    var country = req.body.country
    var date_of_birth = req.body.dateofbirth

    var account = await Account.findById(userID);

    account.name = name
    account.email = email
    account.phone = phone
    account.country = country
    account.date_of_birth = date_of_birth

    account.markModified('name');
    account.markModified('email');
    account.markModified('phone');
    account.markModified('country');
    account.markModified('date_of_birth');

    await account.save()

    res.redirect('back')
}

module.exports.getFlight = async function(req, res){
    var flights = await Flight.find();
    var airports = await Airport.find();
    var planes = await Plane.find();

    res.render('./admin/flights/index', {
        flights,
        airports,
        planes
    })
}

module.exports.editFlight = async function(req, res){
    var flightId = req.params.flightId;
    var arrival = req.body.arrival
    var takeoff = req.body.takeoff
    var timeStart = new Date(req.body.timeStart);
    var timeArrived = new Date(req.body.timeArrived);
    var planeCode = req.body.planeCode;
    var status = req.body.status;
    var ticketAmount = req.body.ticketAmount;

    var flight = await Flight.findById(flightId);

    flight.SBDen = arrival
    flight.SBDi = takeoff
    flight.GioXuatPhat = timeStart
    flight.GioDen = timeArrived
    flight.planeCode = planeCode;
    flight.status = status;
    flight.ticketAmount = ticketAmount;

    flight.markModified('arrival');
    flight.markModified('takeoff');
    flight.markModified('timeStart');
    flight.markModified('timeArrived');
    flight.markModified('planeCode');
    flight.markModified('status');
    flight.markModified('ticketAmount');

    await flight.save()

    res.redirect('/admin/flights/')
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

    res.render('./admin/flights/edit', {
        flight,
        khoiHanh,
        haCanh,
        airports,
        planes
    })
    console.log(khoiHanh)
}

module.exports.createFlight = async function(req, res){
    var arrival = req.body.arrival;
    var takeoff = req.body.takeoff;
    var timeStart = new Date(req.body.timeStart);
    var timeArrived = new Date(req.body.timeArrived);
    var planeCode = req.body.planeCode;
    var status = 'Normal';
    var ticketAmount = req.body.ticketAmount;


    var flight = new Flight();
    flight.SBDen = arrival;
    flight.SBDi = takeoff;
    flight.GioXuatPhat = timeStart;
    flight.GioDen = timeArrived;
    flight.planeCode = planeCode;
    flight.status = status;
    flight.ticketAmount = ticketAmount;

    Flight.create(flight);

    res.redirect('back');

    console.log(flight);
}
//Airport manage
module.exports.getAirport = async function(req, res){
    var airports = await Airport.find();

    res.render('./admin/airports/index', {
        airports
    })
}

module.exports.createAirport = async function(req, res){
    var name = req.body.name;
    var code = req.body.code;

    var airport = new Airport();
    airport.name = name;
    airport.code = code;

    Airport.create(airport);

    res.redirect('back');
}

module.exports.getEditAirport = async function(req, res){
    var airportId = req.params.airportId
    var airport = await Airport.findById(airportId);
    res.render('./admin/airports/edit', {
        airport
    })
}

module.exports.editAirport = async function(req, res){
    var airportId = req.params.airportId
    var name = req.body.name
    var code = req.body.code

    var airport = await Airport.findById(airportId);

    airport.name = name
    airport.code = code

    airport.markModified('name');
    airport.markModified('code');

    await airport.save()

    res.redirect('/admin/airports')
}

module.exports.deleteAirport = async function(req, res){
    var airportId = req.params.airportId

    await Airport.findOneAndRemove({_id: airportId});


    res.redirect('back')
}

//Plane
module.exports.getPlane = async function(req, res){
    var plane = await Plane.find();
    res.render('./admin/plane/index', {
        plane
    });
}

module.exports.getEditPlane = async function(req, res){
    var planeID = req.params.planeID;

    var plane = await Plane.findById(planeID);

    res.render('./admin/plane/editPlane', {
        plane
    })
}

module.exports.deletePlane = async function(req, res){
    var planeID = req.params.planeID;

    await Plane.findByIdAndDelete(planeID)

    res.redirect('back')
}

module.exports.postCreatePlane = async function(req, res){
    var plane = new Plane(req.body);
    Plane.create(plane);
    res.redirect('back')
}

module.exports.postEditPlane = async function(req, res){
    var planeID = req.params.planeID;
    var plane = await Plane.findById(planeID);

    console.log(plane)

    plane.name = req.body.name;
    plane.code = req.body.code;
    plane.markModified('name')
    plane.markModified('code')
    plane.save();
    res.redirect('back');
}