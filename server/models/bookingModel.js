const mongoose = require('mongoose');

const { Schema } = mongoose;
const bookingSchema = new Schema(
  {
    tour: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Tour',
      require: [true, 'A booking must be associated with Tour'],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      require: [true, 'A booking must be associated with User'],
    },
    price: {
      type: Number,
      require: [true, 'A booking must have a price'],
    },
    paid: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);
bookingSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user' }).populate({ path: 'tour' });
  next();
});
exports.Booking = mongoose.model('Booking', bookingSchema);
