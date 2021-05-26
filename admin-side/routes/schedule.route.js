const express = require("express");
const router = express.Router();
const controller = require("../controllers/schedule.controller");

router.get("/", controller.getSchedule);

router.post("/create", controller.postCreate);

module.exports = router;
