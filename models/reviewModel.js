const mongoose = require('mongoose');

const { SchemaTypes } = mongoose;
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    review: {
      type: String,
    },
    rating: {
      type: Number,
      max: [5, 'A rating must be lesser than 5'],
      min: [1, "A rating mustn't be lesser than 1"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: SchemaTypes.ObjectId,
      ref: 'Tour',
      require: [true, 'A review must be of Tour'],
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'A review must have a user '],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);
reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'user',
  //     select: 'name photo',
  //   }).populate({
  //     path: 'tour',
  //     select: 'name difficulty',
  //   });
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
