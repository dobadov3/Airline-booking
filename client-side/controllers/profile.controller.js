const Customer = require('../models/customer.model')
const Bill = require('../models/bill.model')
const BillDetail = require('../models/bill_detail.model')
const Ticket = require('../models/ticket.model')
const Cancel = require('../models/cancel.model');
const Status = require("../models/status.model");
const md5 = require('md5')
const _ = require("lodash");

module.exports.get = async function(req, res){
    var currentAccount = await Customer.findById(req.signedCookies.userID)

    res.render("./profile/profile", {
        currentAccount,
    });
}

module.exports.getResetPass = async function(req, res){
    res.render('./profile/password')
}

module.exports.getHistory = async function(req, res){
    var userID = req.signedCookies.userID;
    var bill_detail = []

    var bills = await Bill.find({customer_id: userID})

    if (req.query.from_date){
        if (!req.query.to_date){
            bills = await Bill.find({
                customer_id: userID,
                date: { $gte: req.query.from_date },
            });
        }else{
            bills = await Bill.find({
                customer_id: userID,
                date: { $gte: req.query.from_date, $lte: req.query.to_date },
            });
        }
    }

    for (let i = 0; i < bills.length; i++) {
        var bd = await BillDetail.find({ bill_id: bills[i]._id }).populate('ticket_id'); 
        var route
        bills[i].bill_detail = bd;
        bill_detail.push(bd)
    }

    res.render("./profile/history", {
        bills,
    });
}

module.exports.getDetail = async function(req, res){
    var {billID} = req.params
    var tickets = []

    var cancels = await Cancel.find({
        customer_id: req.signedCookies.userID,
        bill_id: billID
    }).populate("ticket_id");

    var bill = await Bill.findById(billID);

    var bill_detail = await BillDetail.find({bill_id: billID}).populate('ticket_id')

    var normalStatus = await Status.findOne({name: 'normal'})

    for (let i = 0; i < bill_detail.length; i++) {
        var ticket = await Ticket.findById(bill_detail[i].ticket_id).populate('route_id');

        tickets.push(ticket);
    }

    console.log(tickets)

    res.render("./profile/detail-history", {
        bill_detail,
        bill,
        normalStatus,
        tickets,
        cancels,
    });
}

module.exports.postChangePass = async function (req, res) {
    var currentAccount = await Customer.findById(req.signedCookies.userID);
    var old_pass = md5(req.body.old_pass);
    var new_pass = md5(req.body.new_pass);

    if (req.body.confirm_newPass !== req.body.new_pass) {
        res.render("./profile/password", {
            error: "Mật khẩu xác nhận không đúng!",
        });
        return;
    }

    if (old_pass !== currentAccount.password) {
        res.render("./profile/password", {
            error: "Mật khẩu cũ không đúng!",
        });
        return;
    }

    currentAccount.password = new_pass;
    currentAccount.save();

    res.redirect("back");
};

module.exports.postProfile = async function (req, res) {
    var currentAccount = await Customer.findById(req.signedCookies.userID);
    
    _.extend(currentAccount, req.body)

    currentAccount.save();

    res.redirect("back");
};

module.exports.cancelTicket = async function (req, res) {
    var {ticketID} = req.params;

    var ticket = await Ticket.findById(ticketID);
    var bill_detail = await BillDetail.findOne({ticket_id: ticketID}).populate('bill_id');
    var bd = await BillDetail.find({bill_id: bill_detail.bill_id._id})
    var bill = await Bill.findById(bill_detail.bill_id._id);

    await BillDetail.findOneAndDelete({ ticket_id: ticketID },);
    ticket.status = "Vẫn còn";
    ticket.save();
    
    if (bd.length === 1){
        await Bill.findByIdAndDelete(bill_detail.bill_id._id);
        res.redirect("/profile/history");
        return;
    }

    Cancel.create(new Cancel({
        ticket_id: ticketID,
        customer_id: req.signedCookies.userID,
        bill_id: bill._id
    }))

    bill.total_payment -= ticket.price;
    bill.save();

    res.redirect('back')
}