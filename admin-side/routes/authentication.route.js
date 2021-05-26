const express = require("express");
const router = express.Router();
const controller = require("../controllers/authentication.controller");

router.get("/", controller.getLogin);
router.post("/", controller.postLogin);

module.exports = router;
