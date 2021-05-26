const express = require("express");
const router = express.Router();
const controller = require("../controllers/airport.controller");

router.get("/", controller.getAirport);
router.get("/edit/:airportId", controller.getEdit);
router.get("/delete/:airportId", controller.delete);
router.post("/create", controller.postCreate);
router.post("/edit/:airportId", controller.postEdit);

module.exports = router;
