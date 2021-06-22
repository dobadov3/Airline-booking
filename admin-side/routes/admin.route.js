const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.controller");

const authenticationMiddleware = require("../middlewares/authentication.middleware");

router.get("/",authenticationMiddleware, controller.get);
router.get("/delete/:adminID",authenticationMiddleware, controller.delete);
router.get("/edit/:adminID",authenticationMiddleware, controller.getEdit);
router.get("/change-pass/:adminID",authenticationMiddleware, controller.getChangePass);

router.post("/create",authenticationMiddleware, controller.postCreate);
router.post("/edit/:adminID",authenticationMiddleware, controller.postEdit);
router.post("/change-pass/:adminID",authenticationMiddleware, controller.postChangePass);

module.exports = router;
