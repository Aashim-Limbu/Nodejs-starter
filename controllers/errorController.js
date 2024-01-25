const AppError = require('../utils/appError');

const DevErrorMessage = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const ProdErrorMessage = (res, err) => {
  if (err.isOperational) {
    //This is Trusted Error not caused by any dependencies //! eg of operational error are Accessing undefined route and putting the invalid data
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: 500,
      error: err,
      message: 'Something went terribly wrong',
    });
  }
};
function handleCastErrorDB(err) {
  return new AppError(`Invalid path:${err.path} value:${err.value}`, 400);
}
function handleDuplicateFieldsDB(err) {
  const value = err.keyValue.name;
  const message = `Duplicate Fields Error value : ${value}`;
  return new AppError(message, 400);
}
function handleValidationErrorDB(err) {
  console.log('Validation Error of the database 💿');
  const errors = Object.values(err.errors).map((e) => e.message);
  const message = `Validator Error occured : ${errors.join('.')}`;
  return new AppError(message, 400);
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  if (process.env.NODE_ENV === 'production') {
    //I see since the error[name] lies in the prototype of an object so to get the prototype of object too we use Object.create()
    //{...err} //!It is only the sallow copy of the err since it don't get the prototype property to get we use Object.create()
    let error = Object.create(err);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    ProdErrorMessage(res, error);
  } else {
    DevErrorMessage(res, err);
  }
};
