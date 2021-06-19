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
        var bill = await Bill.findOne().sort({ _id: -1 });
        var bill_detail = await BillDetail.find({bill_id: bill._id})

        for (let i = 0; i < bill_detail.length; i++) {
            var ticket = await Ticket.findById(bill_detail[i].ticket_id);
            ticket.status = "Vẫn còn";
            ticket.save();

            await BillDetail.findByIdAndDelete(bill_detail[i]._id);
        }

        await Bill.findByIdAndDelete(bill._id);
        
        res.render("./flight/fail");
    });
    
    //api
    app.use("/api", currentUserAPI);

};

module.exports = router;
