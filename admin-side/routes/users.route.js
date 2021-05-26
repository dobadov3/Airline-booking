const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.getUser);
router.get("/edit/:userID", controller.getEdit);
router.get("/delete/:userID", controller.delete);

router.post("/create", controller.postCreate);
router.post("/edit/:userID", controller.postEdit);

module.exports = router;
