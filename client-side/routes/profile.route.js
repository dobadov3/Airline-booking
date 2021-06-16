const express = require("express");
const router = express.Router();
const controller = require("../controllers/profile.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, controller.get);
router.post("/", authMiddleware, controller.postProfile);
router.get("/change-password", authMiddleware, controller.getResetPass);
router.post("/change-password", authMiddleware, controller.postChangePass);
router.get("/history", authMiddleware, controller.getHistory);
router.get("/history/detail/:billID", authMiddleware, controller.getDetail);

router.post("/cancel-ticket/:ticketID", controller.cancelTicket);

module.exports = router;
