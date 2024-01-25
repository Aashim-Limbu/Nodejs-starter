const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
exports.signUp = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });
  const token = signToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});
exports.signIn = catchAsync(async (req, res, next) => {
  console.log('this is sign In');
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide the email and password', 400));
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError('Sorry either the password or user is Incorrect', 401),
    );
  }
  const token = signToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
  });
});
