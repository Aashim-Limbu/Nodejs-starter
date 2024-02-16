const mongoose = require('mongoose');
const Tour = require('./tourModel');

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
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRatings: { $avg: '$rating' },
      },
    },
  ]);
  console.log('stats', stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRatings,
      ratingQuantity: stats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 0,
      ratingQuantity: 0,
    });
  }
  console.log(stats);
};
reviewSchema.index({ user: 1, tour: 1 }, { unique: true });
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour); //static method is called using this.constructor
});
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
reviewSchema.pre(/^findOneAnd/, async function (next) {
  const doc = await this.model.findOne(this.getQuery()); //since this is query to get the model we use .model to access the schema model
  this.temp = doc;
  console.log('this.temp.tour', this.temp.tour);
  next();
  //   const { tour } = await this.model.findOne(); //since this is query to get the model we use .model to access the schema model
  //   console.log('inside pre middleware');
  //   this.temp = tour;
  //   next();
});
reviewSchema.post(/^findOneAnd/, function () {
  //   await this.model.calcAverageRatings(this.temp.temp);
  console.log('inside the post');
  this.model.calcAverageRatings(this.temp.tour);
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
