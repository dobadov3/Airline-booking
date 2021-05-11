var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.controller');

router.get('/', adminController.get);
router.get('/users', adminController.getUser);
router.post('/create', adminController.create);
router.get('/delete/:userID', adminController.deleteUser);

module.exports = router;
