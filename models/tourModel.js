const mongoose = require('mongoose');

const { Schema } = mongoose;
const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tour must have Name'],
    unique: true,
    trim: true,
  },
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
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
