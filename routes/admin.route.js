var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.controller');

router.get('/', adminController.get);
router.get('/users', adminController.getUser);
router.get('/users/delete/:userID', adminController.deleteUser);
router.get('/users/edit/:userID', adminController.getEditUser);

router.post('/users/create', adminController.create);
router.post('/users/edit/:userID', adminController.editUser)

module.exports = router;
