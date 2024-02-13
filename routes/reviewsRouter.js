const express = require('express');
const authController = require('../controllers/authenticationController');
const reviewController = require('../controllers/reviewsController');

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .post(
    authController.control,
    authController.restrictTo('user'),
    reviewController.setTourNUser,
    reviewController.createReview,
  )
  .get(reviewController.getAllReview);
router
  .route('/:id')
  .delete(reviewController.deleteReview)
  .get(reviewController.getReview)
  .patch(reviewController.updateReview);
module.exports = router;
