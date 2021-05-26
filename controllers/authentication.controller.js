var md5 = require('md5');
var Account = require('../models/account.model');

module.exports.login = function(req, res) {
    res.render('./authentication/index', {
        error: "",
        errorSignUp: ""
    })
}

module.exports.postLogin = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password

    var user = await Account.findOne({ email: email });

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
            data: data.data,
            values: req.body
        });
        return;
    }

    res.cookie('userID', user.id, {
        signed: true
    });

    if (user.role === "admin"){
        res.redirect('/admin/users');
    }else{
        res.redirect('/home');
    }
}

module.exports.logout = function(req, res) {
    res.clearCookie("userID");
    res.redirect('/home');
}

module.exports.postSignUp = async function(req, res) {
    var email = req.body.emailSignUp;
    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.passwordSignUp;
    var confirmPass = req.body.confirmPassword;
    var errorSignUp = "";

    var user = await Account.findOne({ email: email });

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

    var newUser = new Account();

    newUser.email = email;
    newUser.name = name;
    newUser.password = md5(password);
    newUser.phone = phone;
    newUser.role = "customer";
    newUser.country = "";
    newUser.date_of_birth = "";
    

    Account.create(newUser);

    res.redirect('back');
}