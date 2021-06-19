const Route = require('../models/route.model')
const Status = require('../models/status.model')
const Bill = require('../models/bill.model')
const BillDetail = require('../models/bill_detail.model')
var moment = require("moment-timezone");
const Ticket = require('../models/ticket.model');


module.exports = async function(req, res, next){
    var routes = await Route.find();
    var today = moment.tz(new Date(), "Asia/Ho_Chi_Minh");

    var normalStatus = await Status.findOne({name: "normal"})
    var checkingStatus = await Status.findOne({name: "checkin"})
    var flyingStatus = await Status.findOne({ name: "Đang bay" });
    var completedStatus = await Status.findOne({ name: "Hoàn thành" });

    routes.forEach((item, index) => {
        var depart_time = moment.tz(item.depart_time, "Asia/Ho_Chi_Minh");
        var arrival_time = moment.tz(item.arrival_time, "Asia/Ho_Chi_Minh");

        if (depart_time - today > 2400000) {
            item.status_id = normalStatus._id;
        }

        if ((depart_time - today) < 2400000 && (item.depart_time - today) > 0){
            item.status_id = checkingStatus._id
        }

        if ((depart_time - today) <= 0 && (arrival_time - today) > 0){
            item.status_id = flyingStatus._id;
        }

        if (arrival_time - today < 0) {
            item.status_id = completedStatus._id;
        }

        item.save();
    })

    var bills = await Bill.find({ payment_status: "Chưa thanh toán"});

    
    for (let i = 0; i < bills.length; i++) {
        var bill_detail = await BillDetail.find({ bill_id: bills[i]._id });
        var date_bill = moment.tz(bills[i].date, "Asia/Ho_Chi_Minh");
        if ((today - date_bill > 1800000)) {
            await Bill.findByIdAndDelete(bills[i]._id);

            for (let j = 0; j < bill_detail.length; j++) {
                var ticket = await Ticket.findById(bill_detail[j].ticket_id);
                ticket.status = "Vẫn còn";
                ticket.save();

                await BillDetail.findByIdAndDelete(bill_detail[j]._id);
            }
        }
    }

    next()
}