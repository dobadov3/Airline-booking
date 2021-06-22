const Bill = require('../models/bill.model')
const BillDetail = require('../models/bill_detail.model')
const Ticket = require('../models/ticket.model')

const homeRoute = require('./home.route');
const flightRoute = require("./flight.route");
const authenticationRoute = require('./authentication.route');
const profileRoute = require("./profile.route");

//api
const currentUserAPI = require('../api/routes/account.route')

const authMiddleware = require("../middleware/auth.middleware");

const router = function(app) {
    app.use(authMiddleware);
    app.use("/", homeRoute);
    app.use("/authentication", authenticationRoute);
    app.use("/flights", flightRoute);
    app.use("/profile", profileRoute);

    app.get("/success", async (req, res) => {
        var bill = await Bill.findOne().sort({_id: -1});

        bill.payment_status = "Đã thanh toán"
        bill.save();
        res.render("./flight/success");
    });
    app.get("/fail", async (req, res) => {
        res.render("./flight/fail");
    });
    app.get("/success/:billID", async (req, res) => {
        var bill = await Bill.findById(req.params.billID);

        bill.payment_status = "Đã thanh toán"
        bill.save();
        res.render("./flight/success");
    });
    app.get("/fail/:billID", async (req, res) => {    
        res.render("./flight/fail");
    });
    
    //api
    app.use("/api", currentUserAPI);

};

module.exports = router;
