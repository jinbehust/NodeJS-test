const createError = require('http-errors');
const express = require('express');
const path = require('path');
require('dotenv').config();
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const dishRouter = require('./src/routes/dishRouter');
const commentRouter = require('./src/routes/commentRouter');
const promoRouter = require('./src/routes/promoRouter');
const leaderRouter = require('./src/routes/leaderRouter');
const uploadRouter = require('./src/routes/uploadRouter');
const favoriteRouter = require('./src/routes/favoriteRouter');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connect.then(
  () => {
    console.log('Connected correctly to database');
  },
  (err) => console.log(err.message)
);

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345 - 67890-09876-54321'));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRouter);
app.use('/dishes', commentRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites', favoriteRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

// Start Server
app.listen(port, () => console.log(`Server listening on port ${port}`));

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
