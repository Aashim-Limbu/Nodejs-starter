// const fs = require('fs');
// const { v4 } = require('uuid');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

// function checkUser(req, res, next, val) {
//   if (val * 1 > users.length)
//     return res.status(400).json({
//       status: 'ERROR',
//       msg: 'invalid id',
//     });
//   next();
// }
function filterObject(body, ...allowededFields) {
  const filteredObject = {};
  Object.keys(body).forEach((el) => {
    if (!allowededFields.includes(el)) return;
    filteredObject[el] = body[el];
  });
  return filteredObject;
}
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('This is not the route to change the password!', 400),
    );
  }
  const filteredBody = filterObject(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: 'Success',
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    status: 'Success',
    date: null,
  });
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: `The route is not defined ${req.originalUrl}`,
  });
};
exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
// exports.checkUser = checkUser;
