const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReview = catchAsync(async (req, res) => {
  let tempFilter = {};
  if (req.params.tourId) tempFilter = { tour: req.params.tourId };
  const review = await Review.find(tempFilter);

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});
exports.setTourNUser = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.tour) req.body.tour = req.params.tourId;
  next();
};

exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
