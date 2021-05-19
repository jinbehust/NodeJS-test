const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connect.then(
  (db) => {
    console.log('Connected correctly to server');
  },
  (err) => console.log(err.message),
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345 - 67890-09876-54321'));

app.use(
  session({
    name: 'session-id',
    secret: '12345 - 67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  }),
);

<<<<<<< HEAD
app.use('/', indexRouter);
app.use('/users', usersRouter);

const auth = (req, res, next) => {
=======
function authFunction(req, res, next) {
  console.log(req.session);

>>>>>>> parent of ce1c299 (Express Session Part 2 temp)
  if (!req.session.user) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
    }

    // eslint-disable-next-line new-cap
    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':');
    const user = auth[0];
    const pass = auth[1];
    if (user === 'admin' && pass === 'password') {
      req.session.user = 'admin';
      next(); // authorized
    } else {
      const err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  } else if (req.session.user === 'admin') {
    next();
  } else {
    const err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
  }
}

app.use(authFunction);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
