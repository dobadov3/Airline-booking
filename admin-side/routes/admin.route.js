var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.controller');

router.get('/', adminController.get);
router.get('/users', adminController.getUser);
router.get('/users/delete/:userID', adminController.deleteUser);
router.get('/users/edit/:userID', adminController.getEditUser);
router.get('/flights', adminController.getFlight);
router.get('/flights/edit/:flightId', adminController.getEditFlight);
router.get('/airports', adminController.getAirport);
router.get('/airports/edit/:airportId', adminController.getEditAirport);
router.get('/airports/delete/:airportId', adminController.deleteAirport);
router.get('/plane', adminController.getPlane)
router.get('/plane/edit/:planeID', adminController.getEditPlane);
router.get('/plane/delete/:planeID', adminController.deletePlane);

router.post('/users/create', adminController.create);
router.post('/users/edit/:userID', adminController.editUser)
router.post('/flights/edit/:flightId', adminController.editFlight);
router.post('/flights/create', adminController.createFlight);
router.post('/airports/create', adminController.createAirport);
router.post('/airports/edit/:airportId', adminController.editAirport);
router.post('/plane/create', adminController.postCreatePlane);
router.post('/plane/edit/:planeID', adminController.postEditPlane);

module.exports = router;
