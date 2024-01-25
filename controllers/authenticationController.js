const { promisify } = require('util');
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
  const { name, email, password, passwordConfirm, role, passwordChangesAt } =
    req.body;
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
    passwordChangesAt,
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
exports.control = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Access Denied! Login to continue !', 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new AppError('token no longer valid', 401));

  if (await freshUser.changePasswordAfter(decoded.iat))
    return next(new AppError('password recently changed please login', 401));
  //!finally here the validation of user to access the route completes
  req.user = freshUser;
  next();
});
