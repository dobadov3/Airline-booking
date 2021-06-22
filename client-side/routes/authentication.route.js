const express = require("express");
const router = express.Router();
const controller = require("../controllers/authentication.controller");
const passport = require('passport')

router.get("/", controller.get);
router.get('/logout', controller.logOut)
router.get('/auth/facebook', passport.authenticate('facebook', {
	scope: 'email'
  }))
  
  router.get(
	  "/auth/facebook/callback",
	  passport.authenticate("facebook", {
		  successRedirect: "/",
		  failureRedirect: "/authentication",
	  })
  );

router.post("/login", controller.postLogin);
router.post('/signUp', controller.postSignUp)

module.exports = router;
