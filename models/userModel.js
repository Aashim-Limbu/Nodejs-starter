const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    enum: ['user', 'admin', 'lead-guide', 'guide'],
    required: [true, 'A user must define the role'],
    default: 'user',
  },
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwodResetTokenExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
userSchema.pre('/^find/', function (next) {
  this.select({ active: true });
  next();
});
userSchema.methods.correctPassword = async function (
  //we could have used this.password but here since this.password is select:none so we pass it as a argument
  candidatePassword,
  password,
) {
  return await bcrypt.compare(candidatePassword, password);
};
userSchema.methods.changePasswordAfter = async function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = new Date(this.passwordChangedAt).getTime() / 1000;
    return JWTTimeStamp < changedTimeStamp; //if false then it suggest the token is issued later than the password change
    //changedTimeStamp is from database and the JWTTimeStamp is created as the token is created [decoded token have the iat and exp fields]
  }
  return false; //false means the date have not been changed
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwodResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.pre('/^find/', function (next) {
  this.select({ active: { $ne: false } });
  next();
});
//encrypting the password before saving in the database

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; //we did -1000 since saving the password in the DB's can be longer then isuuing the jwtToken {iat}
  next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;
