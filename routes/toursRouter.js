const express = require('express');
const reviewRouter = require('./reviewsRouter');
// const reviewController = require('../controllers/reviewsController');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  setParameter,
  getTourStats,
  getTheBusyMonth,
} = require('../controllers/tourController');

const router = express.Router();
// router.param('id', checkId);
// router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/top-5-tours').get(setParameter, getAllTours);
router.route('/get-busy-month/:year').get(getTheBusyMonth);
router.route('/get-tour-stats').get(getTourStats);
router.route('/').get(getAllTours).post(createTour);
//!i guess this is for the admin and lead-guide only
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
//! Advance express mounting the router
router.use('/:tourId/reviews', reviewRouter);
module.exports = router;
