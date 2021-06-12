const express = require("express");
const router = express.Router();
const controller = require("../controllers/flight.controller");

router.get("/", controller.get);

router.get("/search", controller.search);

router.get("/booking/one-way", controller.oneWay);

router.get("/booking/round-trip", controller.roundTrip);

module.exports = router;
