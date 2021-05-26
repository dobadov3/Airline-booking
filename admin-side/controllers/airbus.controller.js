const Airbus = require('../models/airbus.model');
const Carrier = require('../models/carrier.model');

module.exports.getAirbus = async function (req, res) {
    var airbuses = await Airbus.find();
    var carriers = await Carrier.find();

    for(let i = 0; i < airbuses.length; i++){
        var carrier = await Carrier.findById(airbuses[i].carrier_id);

        airbuses[i].carrier = carrier.name
    }

    res.render("./airbus/index", {
        airbuses,
        carriers
    });
};

module.exports.postCreate = async function (req, res) {
    var airbus = new Airbus(req.body);
    Airbus.create(airbus);
    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var airbusID = req.params.airbusID;
    
    var airbus = await Airbus.findById(airbusID);
    var carriers = await Carrier.find();
    
    res.render("./airbus/edit", {
        carriers,
        airbus
    });
};

module.exports.postEdit = async function (req, res) {
    var airbusID = req.params.airbusID;
    var airbus = await Airbus.findById(airbusID);

    airbus.name = req.body.name;
    airbus.code = req.body.code;
    airbus.seatNum = req.body.seatNum;
    airbus.carrier_id = req.body.carrier_id;
    airbus.markModified("name");
    airbus.markModified("code");
    airbus.markModified("seatNum");
    airbus.markModified("carrier_id");
    airbus.save();
    res.redirect("/airbus");
};

module.exports.delete = async function (req, res) {
    var airbusID = req.params.airbusID;

    await Airbus.findByIdAndDelete(airbusID);

    res.redirect("back");
};


