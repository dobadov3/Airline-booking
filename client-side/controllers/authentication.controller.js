var md5 = require('md5');
var Customer = require('../models/customer.model');

module.exports.login = function(req, res) {
    res.render('./authentication/index', {
        error: "",
        errorSignUp: ""
    })
}

module.exports.postLogin = async function(req, res) {
    var password = req.body.password

    var user = await Customer.findOne({ username: req.body.username });

    console.log(user)
    if (!user) {
        res.render('./authentication/index', {
            error: "Account doesn't exits!",
            values: req.body
        });
        return;
    }

    if (md5(password) !== user.password) {
        res.render('./authentication/index', {
            error: "Wrong password!",
            values: req.body
        });
        return;
    }

    res.cookie('userID', user.id, {
        signed: true
    });

    res.redirect("/home");
}

module.exports.logout = function(req, res) {
    res.clearCookie("userID");
    res.redirect('/home');
}

module.exports.postSignUp = async function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var confirmPass = req.body.confirmPassword;
    var errorSignUp = "";
    req.body.country = "";
    req.body.date_of_birth = "";

    var user = await Customer.findOne({ username: username });

    if (user) {
        errorSignUp = "Account already exist!";
        res.render('./authentication/index', {
            errorSignUp,
            values: req.body
        })
        return;
    }


    if (password !== confirmPass) {
        errorSignUp = "Confirm password is not correct!";
        res.render('./authentication/index', {
            errorSignUp,
            values: req.body
        })
        return;
    }

    req.body.password = md5(password);

    var newUser = new Customer(req.body);

    Customer.create(newUser);

    res.redirect('back');
}