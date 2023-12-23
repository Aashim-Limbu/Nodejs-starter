const express = require('express');
const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');
const app = express();
app.use(express.json());
app.use(express.static('./public'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tours', toursRouter);
module.exports = app;
