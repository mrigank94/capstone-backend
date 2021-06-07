const express = require("express");
const { createBooking } = require("../controllers/booking");
const { getVehicles, addVehicle } = require("../controllers/vehicle");
const router = express.Router();
const {signUp, signIn} = require('./../controllers/auth');
const admin = require('./../middleware/admin');
const auth = require('./../middleware/auth');

//Auth
router.post('/hirewheels/v1/users', signUp);
router.post('hirewheels/v1/users/access-token', signIn);

//Vehicle
router.get('/hirewheels/v1/vehicles', auth, getVehicles);
router.post('/hirewheels/v1/vehicles', admin, addVehicle);

//Booking
router.post('/hirewheels/v1/bookings', auth, createBooking);

module.exports = router;