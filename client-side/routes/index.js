const homeRoute = require("./home.route");
const authenticationRoute = require("./authentication.route");

var router = function (app) {
    app.use("/home", homeRoute);
    app.use("/authentication", authenticationRoute);
};

module.exports = router;
