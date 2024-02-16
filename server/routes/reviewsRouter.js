const express = require('express');
const authController = require('../controllers/authenticationController');
const reviewController = require('../controllers/reviewsController');

const router = express.Router({ mergeParams: true });
router.use(authController.control);
router
  .route('/')
  .post(
    authController.restrictTo('user'),
    reviewController.setTourNUser,
    reviewController.createReview,
  )
  .get(reviewController.getAllReview);
router
  .route('/:id')
  .delete(
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview,
  )
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('admin', 'user'),
    reviewController.updateReview,
  );
module.exports = router;
