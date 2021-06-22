const Account = require("../models/account.model");
const Role = require("../models/role.model");
const md5 = require('md5')
const _ = require("lodash");

module.exports.get = async function (req, res) {
    var roleStaff = await Role.findOne({ name: "staff" });
    var staffs = await Account.find({role_id: roleStaff._id});

    res.render("./staff/index", {
        staffs,
    });
};

module.exports.postCreate = async function (req, res) {
    var roleStaff = await Role.findOne({ name: "staff" });
    req.body.role_id = roleStaff._id
    Account.create(req.body, (err, docs) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var staff = await Account.findById(req.params.staffID);

    res.render("./staff/edit", {
        staff,
    });
};

module.exports.postEdit = async function (req, res) {
    var staff = await Account.findById(req.params.staffID);
    _.extend(staff, req.body);
    staff.save((err, docs) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect("/staffs");
};

module.exports.delete = async function (req, res) {
    Account.findByIdAndDelete(req.params.staffID, (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect("back");
};

module.exports.getChangePass = async function(req, res){
    var staff = await Account.findById(req.params.staffID);

    res.render("./staff/change-pass", {
        staff,
    });
}

module.exports.postChangePass = async function(req, res){
    var staff = await Account.findById(req.params.staffID);
    const {newPass, confirmPass} = req.body;

    if (newPass !== confirmPass){
        res.render("./staff/change-pass", {
            staff,
            values: {
                newPass,
                confirmPass
            },
            error: "Mật khẩu xác nhận không đúng"
        });
        return;
    }else{
        staff.password = md5(newPass);
        staff.save();

        res.render("./staff/change-pass", {
            staff,
            success: "Cập nhật mật khẩu thành công"
        });
    }
}