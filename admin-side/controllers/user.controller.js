const Customer = require('../models/customer.model');
const defaultPass = '123';

module.exports.getUser = async function (req, res) {
    var customers = await Customer.find();

    res.render("./users/index", {
        customers
    });
};

module.exports.postCreate = async function (req, res) {
    var user = new Customer(req.body);

    Customer.create(user);

    res.redirect("back");
};

module.exports.delete = async function (req, res) {
    var userID = req.params.userID;

    await Customer.findByIdAndDelete(userID);

    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var userID = req.params.userID;
    var customer = await Customer.findById(userID);
    res.render("./users/edit", {
        customer,
    });
};

module.exports.postEdit = async function (req, res) {
    var userID = req.params.userID;
    var name = req.body.fullName;
    var username = req.body.username;
    var email = req.body.email;
    var phone = req.body.tel;
    var country = req.body.country;
    var date_of_birth = req.body.dateofbirth;

    var customer = await Customer.findById(userID);

    customer.username = username;
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.country = country;
    customer.date_of_birth = date_of_birth;

    customer.markModified("username");
    customer.markModified("name");
    customer.markModified("email");
    customer.markModified("phone");
    customer.markModified("country");
    customer.markModified("date_of_birth");

    await customer.save();

    res.redirect("/users");
};
