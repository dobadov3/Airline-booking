const express = require("express");
const router = express.Router();
const controller = require("../controllers/customer.controller");

const authenticationMiddleware = require("../middlewares/authentication.middleware");

router.get("/", authenticationMiddleware, controller.get);
router.get("/delete/:customerID", authenticationMiddleware, controller.delete);
router.get("/edit/:customerID", authenticationMiddleware, controller.getEdit);
router.get("/change-pass/:customerID",authenticationMiddleware, controller.getChangePass);

router.post("/create", authenticationMiddleware, controller.postCreate);
router.post("/edit/:customerID", authenticationMiddleware, controller.postEdit);
router.post("/change-pass/:customerID",authenticationMiddleware, controller.postChangePass);

module.exports = router;
