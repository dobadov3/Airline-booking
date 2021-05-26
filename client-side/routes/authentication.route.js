var express = require('express');
var router = express.Router();
var controller = require('../controllers/authentication.controller');

router.get('/', controller.login);

router.post('/login', controller.postLogin);

router.post('/signUp', controller.postSignUp);

router.get('/logout', controller.logout);

module.exports = router;