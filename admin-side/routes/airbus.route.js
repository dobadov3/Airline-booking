const express = require("express");
const router = express.Router();
const controller = require("../controllers/airbus.controller");

router.get("/", controller.getAirbus);
router.get("/edit/:airbusID", controller.getEdit);
router.get("/delete/:airbusID", controller.delete);
router.post("/create", controller.postCreate);
router.post("/edit/:airbusID", controller.postEdit);

module.exports = router;
