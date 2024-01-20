const DevErrorMessage = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack,
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
      message: 'Something went terribly wrong',
    });
  }
};
module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    ProdErrorMessage(res, err);
  } else {
    DevErrorMessage(res, err);
  }
};
