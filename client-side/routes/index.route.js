const homeRoute = require('./home.route');
const flightRoute = require("./flight.route");
const authenticationRoute = require('./authentication.route');

const router = function(app) {
    app.use("/", homeRoute);
    app.use("/authentication", authenticationRoute);
    app.use("/flights", flightRoute);
};

module.exports = router;
