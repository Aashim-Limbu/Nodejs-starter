const express = require('express');
const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tours', toursRouter);
app.all('*', (req, res, next) => {
  //   const error = new Error(`This is the Aashim Error ${req.originalUrl}`);
  //   error.statusCode = 404;
  //   error.status = 'failed';
  //! what ever we pass to the next express knows it as an error it will skip all other middleware and send error to global error handling middleware
  //   next(error);
  next(new AppError(`No ${req.originalUrl} route have been defined`, 404));
});
//global error handling middleware container
//it has err,req,res,next as a parameter express already knows that if the middleware is for the error or not
app.use(globalErrorHandler);

module.exports = app;
