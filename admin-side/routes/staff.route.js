const express = require("express");
const router = express.Router();
const controller = require("../controllers/staff.controller");

const authenticationMiddleware = require("../middlewares/authentication.middleware");

router.get("/", authenticationMiddleware, controller.get);
router.get("/delete/:staffID", authenticationMiddleware, controller.delete);
router.get("/edit/:staffID", authenticationMiddleware, controller.getEdit);
router.get("/change-pass/:staffID",authenticationMiddleware, controller.getChangePass);

router.post("/create", authenticationMiddleware, controller.postCreate);
router.post("/edit/:staffID", authenticationMiddleware, controller.postEdit);
router.post("/change-pass/:staffID",authenticationMiddleware, controller.postChangePass);

module.exports = router;
