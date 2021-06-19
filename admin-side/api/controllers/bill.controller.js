const Bill = require('../../models/bill.model')

module.exports.get = async function(req, res){
    var bills = await Bill.find();

    res.json(bills)
}

module.exports.getByCode = async function (req, res) {
    var bills = await Bill.find({code: req.params.code});

    res.json(bills);
};
