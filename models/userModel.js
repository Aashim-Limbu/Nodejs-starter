const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
    maxLength: [30, 'A password must be lesser than 30 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A password must be confirmed to signUp the user'],
    validate: {
      validator: function (conf) {
        return this.password === conf;
      },
      message: 'The Password do not match with each other',
    },
  },
});
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('users', userSchema);
module.exports = User;
