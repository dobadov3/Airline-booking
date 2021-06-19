const express = require("express");
const router = express.Router();
const controller = require("../controllers/bill.controller");

router.get("/", controller.get);
router.get("/:code", controller.getByCode);

module.exports = router;
