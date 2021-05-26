const Carrier = require('../models/carrier.model');

module.exports.get = async function(req, res){
    var carriers = await Carrier.find();
    res.render("./carrier/index", {
        carriers
    });
}

module.exports.postCreate = async function(req, res){
    var carrier = new Carrier(req.body);
    Carrier.create(carrier);
    res.redirect('back');
}

module.exports.getEdit = async function(req, res){
    var carrierID = req.params.carrierID;

    var carrier = await Carrier.findById(carrierID);

    res.render('./carrier/edit', {
        carrier
    })
}

module.exports.postEdit = async function(req, res){
    var carrierID = req.params.carrierID;

    var carrier = await Carrier.findById(carrierID);

    carrier.name = req.body.name;
    carrier.code = req.body.code;

    carrier.markModified('name')
    carrier.markModified('code')

    carrier.save();

    res.redirect("/carriers");
}

module.exports.delete = async function(req, res){
    var carrierID = req.params.carrierID;
    await Carrier.findByIdAndDelete(carrierID);
    res.redirect('back');
}