var express = require('express');
var router = express.Router();
var controller = require('../controllers/authentication.controller');

router.get('/login', controller.login);

module.exports = router;