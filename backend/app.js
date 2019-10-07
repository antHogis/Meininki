const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

const app = express();

app.use(cors({origin:'http://localhost:8080'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes Middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('connected to db')
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`Error: ${err}`);
});

module.exports = app;
