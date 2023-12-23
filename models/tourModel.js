const mongoose = require('mongoose');

const { Schema } = mongoose;
const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is must'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'price is must'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
