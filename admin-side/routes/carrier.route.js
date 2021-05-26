const express = require("express");
const router = express.Router();
const controller = require("../controllers/carrier.controller");

router.get("/", controller.get);
router.get("/edit/:carrierID", controller.getEdit);
router.get("/delete/:carrierID", controller.delete);

router.post('/create', controller.postCreate);
router.post("/edit/:carrierID", controller.postEdit);

module.exports = router;
