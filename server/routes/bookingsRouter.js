const express = require('express');
const authController = require('../controllers/authenticationController');
const bookingController = require('../controllers/bookingController');

const bookingRouter = express.Router();
bookingRouter.get(
  '/session-status/:tour_id',
  authController.control,
  bookingController.getStripeSession,
);
bookingRouter.use(authController.control);
bookingRouter
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBookings);
bookingRouter
  .route('/:id')
  .get(bookingController.getBookings)
  .patch(bookingController.updateBookings)
  .delete(bookingController.deleteBookings);
bookingRouter.route('/get-my-bookings').get(bookingController.getMyBookings);
module.exports = bookingRouter;
// bookingRouter.post('/webhook', bookingController.handleWebhook);
