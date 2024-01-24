const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: [40, 'A name must be lesser than or equal to 40 characters'],
    minLength: [3, 'A name must be greater than or equal to 3 characters'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: function (v) {
      return validator.isEmail(v);
    },
    message: 'Please fill a valid email address',
  },
  role: {
    type: String,
    required: [true, 'A user must define the role'],
  },
  active: Boolean,
  photo: String,
  password: {
    type: String,
    minLength: [8, 'A password must be greater than 8 characters'],
  },
  passwordConfirm: {
    type: String,
    minlength: [8, "Password doesn't match"],
  },
});
const User = mongoose.model('users', userSchema);
module.exports = User;
