const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const helmet = require('helmet');
const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');
const reviewsRouter = require('./routes/reviewsRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(helmet());
const limitter = rateLimit({
  limit: 100,
  windowMS: 60 * 60 * 1000,
  message:
    'Error Occured !! Too Many request please trying again in next hours',
});
app.use(express.json({ limit: '10kb' }));
app.use('/api', limitter);
app.use(mongoSanitize());
app.use(xss());
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`No ${req.originalUrl} route have been defined`, 404));
});
//global error handling middleware container
//it has err,req,res,next as a parameter express already knows that if the middleware is for the error or not
app.use(globalErrorHandler);

module.exports = app;
