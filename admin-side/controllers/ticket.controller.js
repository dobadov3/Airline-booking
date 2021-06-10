const Route = require('../models/route.model');
const TicketClass = require('../models/ticket_class.model');

module.exports.get = async function(req, res){
    var routes = await Route.find();
    var ticket_classes = await TicketClass.find();

    res.render("./ticket/index", {
        routes,
        ticket_classes
    });
}