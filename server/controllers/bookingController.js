require('dotenv').config('../config.env');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');
const { Booking } = require('../models/bookingModel');
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getStripeSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tour_id);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/`,
      cancel_url: `${req.protocol}://${req.get('host')}/tours/${tour.id}`,
      client_reference_id: req.params.tour_id,
      customer_email: req.user.email,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            product_data: {
              name: tour.name,
              images: [
                `${req.protocol}://${req.get('host')}/img/tours/${
                  tour.imageCover
                }`,
              ],
              description: tour.description,
            },
            currency: 'usd',
            unit_amount: tour.price * 100,
          },
          quantity: 1,
        },
      ],
    });
    res.status(303).json({
      status: 'success',
      data: session.url,
    });
  } catch (error) {
    console.error(error);
    next(error, 400);
  }
});
exports.getMyBookings = catchAsync(async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.status(200).json({
      status: 'success',
      data: {
        bookings,
      },
    });
  } catch (error) {
    next(error, 400);
  }
});
exports.createBookings = createOne(Booking);
exports.getBookings = getOne(Booking);
exports.getAllBookings = getAll(Booking);
exports.updateBookings = updateOne(Booking);
exports.deleteBookings = deleteOne(Booking);
