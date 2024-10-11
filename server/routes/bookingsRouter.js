const express = require('express');
const authController = require('../controllers/authenticationController');
const bookingController = require('../controllers/bookingController');

const bookingRouter = express.Router();
bookingRouter.get(
  '/session-status/:tour_id',
  authController.control,
  bookingController.getStripeSession,
);
module.exports = bookingRouter;
