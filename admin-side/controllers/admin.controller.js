const Account = require("../models/account.model");
const Role = require('../models/role.model');
const md5 = require('md5')
const _ = require("lodash");

module.exports.get = async function (req, res) {
    var roleAdmin = await Role.findOne({name: 'admin'});
    var admins = await Account.find({ role_id: roleAdmin._id });

    res.render("./admin/index", {
        admins,
    });
};

module.exports.postCreate = async function (req, res) {
    var roleAdmin = await Role.findOne({ name: "admin" });
    req.body.role_id = roleAdmin._id
    Account.create(req.body, (err, docs) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var admin = await Account.findById(req.params.adminID);

    res.render("./admin/edit", {
        admin,
    });
};

module.exports.postEdit = async function (req, res) {
    var admin = await Account.findById(req.params.adminID);
    _.extend(admin, req.body);
    admin.save((err, docs) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect("/admins");
};

module.exports.delete = async function (req, res) {
    Account.findByIdAndDelete(req.params.adminID, (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect("back");
};

module.exports.getChangePass = async function(req, res){
    var admin = await Account.findById(req.params.adminID);

    res.render("./admin/change-pass", {
        admin,
    });
}

module.exports.postChangePass = async function(req, res){
    var admin = await Account.findById(req.params.adminID);
    const {newPass, confirmPass} = req.body;

    if (newPass !== confirmPass){
        res.render("./admin/change-pass", {
            admin,
            values: {
                newPass,
                confirmPass
            },
            error: "Mật khẩu xác nhận không đúng"
        });
        return;
    }else{
        admin.password = md5(newPass);
        admin.save();

        res.render("./admin/change-pass", {
            admin,
            success: "Cập nhật mật khẩu thành công"
        });
    }
}
