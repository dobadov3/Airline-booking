const Airport = require('../models/airport.model');
const TicketClass = require('../models/ticket_class.model');
const Customer = require('../models/customer.model');
const md5 = require('md5')
const shortId = require('short-id')

module.exports.get = async function(req, res){
    var airports = await Airport.find();
    var ticket_classes = await TicketClass.find();

    if (!req.session.passport){
        
    }else{
        var user = req.session.passport.user;
        var userID = ''
        if (user){
            var customer = await Customer.findOne({
                email: user._json.email,
                type: "facebook"
            })
    
            if (!customer){
                var newAccount = new Customer({
                    username: user.id,
                    name: user._json.name,
                    email: user._json.email,
                    date_of_birth: user._json.birthday ? new Date(user._json.birthday) : new Date(2000, 01, 01),
                    gender: user._json.gender === 'male' ? 'Nam' : 'Nữ',
                    password: md5(shortId.generate()),
                    type: 'facebook'
                });
    
                Customer.create(newAccount);
                userID = newAccount._id
                res.locals.checkLogin = true;
            }else{
                userID = customer._id
                res.locals.checkLogin = true;
            }
    
            res.cookie("userID", userID, {
                signed: true,
            });
        }
    }
    

    res.render("./home/index", {
        airports,
        ticket_classes
    });
}

var facebook = async function(req, res){
    
}