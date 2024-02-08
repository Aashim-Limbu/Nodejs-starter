// const fs = require('fs');
// const { v4 } = require('uuid');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// function checkUser(req, res, next, val) {
//   if (val * 1 > users.length)
//     return res.status(400).json({
//       status: 'ERROR',
//       msg: 'invalid id',
//     });
//   next();
// }
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'Success',
    data: users,
    message: 'successful request',
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(Object.assign({ active: false }, req.body));
  res.status(200).json({
    status: 'success',
    data: newUser,
  });
});
exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError('Sorry User not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = User.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError('User Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

// exports.checkUser = checkUser;
