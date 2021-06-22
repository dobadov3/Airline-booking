const Customer = require("../models/customer.model");
const md5 = require('md5')
const _ = require("lodash");

module.exports.get = async function (req, res) {
    var customers = await Customer.find();

    res.render("./customer/index", {
        customers,
    });
};

module.exports.postCreate = async function (req, res) {
    Customer.create(req.body, (err, docs) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var customer = await Customer.findById(req.params.customerID);

    res.render("./customer/edit", {
        customer,
    });
};

module.exports.postEdit = async function (req, res) {
    var customer = await Customer.findById(req.params.customerID);
    _.extend(customer, req.body);
    customer.save((err, docs) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect("/customers");
};

module.exports.delete = async function (req, res) {
    Customer.findByIdAndDelete(req.params.customerID, (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect("back");
};

module.exports.getChangePass = async function(req, res){
    var customer = await Customer.findById(req.params.customerID);

    res.render("./customer/change-pass", {
        customer,
    });
}

module.exports.postChangePass = async function(req, res){
    var customer = await Customer.findById(req.params.customerID);
    const {newPass, confirmPass} = req.body;

    if (newPass !== confirmPass){
        res.render("./customer/change-pass", {
            customer,
            values: {
                newPass,
                confirmPass
            },
            error: "Mật khẩu xác nhận không đúng"
        });
        return;
    }else{
        customer.password = md5(newPass);
        customer.save();

        res.render("./customer/change-pass", {
            customer,
            success: "Cập nhật mật khẩu thành công"
        });
    }
}
