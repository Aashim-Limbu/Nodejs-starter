const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { sendEmail } = require('../utils/email');

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
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
  createSendToken(user, 201, res);
  //   const token = signToken(user._id);
  //   res.status(201).json({
  //     status: 'success',
  //     token,
  //     data: {
  //       user,
  //     },
  //   });
});
exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide the email and password', 400));
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError('Sorry either the password or user is Incorrect', 401),
    );
  }
  createSendToken(user, 200, res);
  //   const token = signToken(user._id);
  //   res.status(201).json({
  //     status: 'success',
  //     token,
  //   });
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
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new AppError('token no longer valid', 401));

  if (await freshUser.changePasswordAfter(decoded.iat))
    return next(new AppError('password recently changed please login', 401));
  //!finally here the validation of user to access the route completes
  req.user = freshUser;
  next();
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //!1)GET USER based on the posted Email
  //!2) Generate random reset token
  //!3)Send it to User's email
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('There are no User with this email address', 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/${resetToken}`;
  const message = `Forgot Password ? Submit new Password to ${resetURL} . If you don't want to forgot password Ignore! `;
  //~ Sending mail
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password Reset Token',
      message,
    });
  } catch (error) {
    user.passwodResetTokenExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save({ validateBeforeSave: false });
    next(
      new AppError(
        `Error on sending Email: ${error} \n Try again later !`,
        500,
      ),
    );
  }
  res.status(200).json({
    status: 'Success',
    message: 'Token sent to an Email',
  });
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedResetToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedResetToken,
    passwodResetTokenExpires: { $gte: Date.now() },
  });
  if (!user) {
    next(
      new AppError(
        "Either the token has expired or resetToken didn't match",
        400,
      ),
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwodResetTokenExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');
  const { password, passwordConfirm, currentPassword } = req.body;
  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError('Wrong Password !', 401));
  }
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();
  createSendToken(user, 200, res);
  //   const token = signToken(user._id);
  //   res.status(200).json({
  //     status: 'success',
  //     token,
  //   });
});
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Permission Denied', 403));
    }
    next();
  };
