const mongoose = require('mongoose');
const slugify = require('slugify');

const { Schema } = mongoose;
const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have Name'],
      unique: true,
      trim: true,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'Tour must have Price'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have the group size'],
    },
    summary: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have the difficulty'],
    },
    priceDiscount: Number,
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// tourSchema.post('save', function (doc, next) {
//   //^   console.log('this is from the post doc middleware');
//   console.log(doc);
//   next();
// });

tourSchema.pre(/^find/, function (next) {
  //^ this run for every string starting with find [find,findOne,findById etc, ...]
  this.find({ secretTour: { $ne: true } });
  next();
});

//! Aggregation Middlewares
//if we need to hide the data while in the aggregation also we use the aggregation middlewares
tourSchema.pre('aggregate', function (next) {
  //   console.log(
  //     'this will give all the aggregation method that we had used ',
  //     this.pipeline(),
  //   );
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
