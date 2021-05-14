var Account = require('../models/account.model');
var md5 = require('md5');
const router = require('../routes/authentication.route');
const defaultPass = "admin123"

module.exports.get = function(req, res){
    res.render('./admin/layouts/layout')
}

module.exports.getUser = async function(req, res){
    var accounts = await Account.find();

    res.render('./admin/users/index', {
        accounts
    })
}

module.exports.create = async function(req, res){
    var name = req.body.fullName;
    var email = req.body.email;
    var tel = req.body.tel;
    var country = req.body.country;
    var date = req.body.date;
    var password = md5(defaultPass);
    var role = "admin"

    var user = new Account();
    user.name = name;
    user.email = email;
    user.phone = tel;
    user.country = country;
    user.date_of_birth = date;
    user.password = password;
    user.role = role;

    Account.create(user);

    res.redirect('back');
}

module.exports.deleteUser = async function(req, res){
    var userID = req.params.userID

    await Account.findOneAndRemove({_id: userID});


    res.redirect('back')
}

module.exports.getEditUser = async function(req, res){
    var userID = req.params.userID
    var account = await Account.findById(userID);
    res.render('./admin/users/edit', {
        account
    })
}

module.exports.editUser = async function(req, res){
    var userID = req.params.userID
    var name = req.body.fullName
    var email = req.body.email
    var phone = req.body.tel
    var country = req.body.country
    var date_of_birth = req.body.dateofbirth

    var account = await Account.findById(userID);

    account.name = name
    account.email = email
    account.phone = phone
    account.country = country
    account.date_of_birth = date_of_birth

    account.markModified('name');
    account.markModified('email');
    account.markModified('phone');
    account.markModified('country');
    account.markModified('date_of_birth');

    await account.save()

    res.redirect('back')
}