const homeRoute = require('./home.route');
const scheduleRoute = require('./schedule.route');
const airbusRoute = require('./airbus.route');
const airportRoute = require('./airport.route');
const carrierRoute = require("./carrier.route");
const usersRoute = require("./users.route");
const authenticationRoute = require("./authentication.route");

var router = function(app){
    app.use('/',homeRoute)
    app.use('/schedule',scheduleRoute)
    app.use("/airbus", airbusRoute);
    app.use("/airports", airportRoute);
    app.use("/carriers", carrierRoute);
    app.use("/users", usersRoute);
    app.use("/authentication", authenticationRoute);
}

module.exports = router;