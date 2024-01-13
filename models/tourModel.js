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
      type: String,
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
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
// tourSchema.post('save', function (doc, next) {
//   //^   console.log('this is from the post doc middleware');
//   console.log(doc);
//   next();
// });
tourSchema.pre('find', function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
