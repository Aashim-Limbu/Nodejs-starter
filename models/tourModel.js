const mongoose = require('mongoose');
const slugify = require('slugify');
const Review = require('./reviewModel');
const User = require('./userModel');

const { Schema } = mongoose;
const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have Name'],
      maxlength: [20, 'Name must be less than or equal 20 characters'],
      minlength: [3, 'Name must be greater than or equal 3 charatcters'],
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
      min: [1, 'Ratings must be greater than or equal to 1'],
      max: [5, 'Ratings must be lesser then or equal to 5'],
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
      enum: {
        values: ['difficult', 'easy', 'medium'],
        message: '{VALUE} is not a valid difficulty level!',
      },
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
    startLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    guides: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    locations: [
      {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});
tourSchema.virtual('reviews', {
  ref: Review,
  foreignField: 'tour',
  localField: '_id',
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
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
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
