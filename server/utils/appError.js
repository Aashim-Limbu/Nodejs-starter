class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? 'Failed' : 'Error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);//With captureStackTrace you exclue the error from the AppError . Since you're handling the error . It would not be relevant to show error from here.
  }
}
module.exports = AppError;
