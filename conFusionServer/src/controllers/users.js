const passport = require('passport');
const User = require('../models/user');
const authenticate = require('../middlewares/authenticate');

async function findUser(req, res) {
  const users = await User.find({});
  if (users) {
    return res.json(users);
  }
}

async function signUp(req, res) {
  try {
    const user = await User.register(
      new User({ username: req.body.username }),
      req.body.password,
    );
    if (req.body.firstname && req.body.lastname) {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
    }
    await user.save();
    passport.authenticate('local')(req, res, () => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, status: 'Registration Successful!' });
    });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({ err });
  }
}

async function logIn(req, res) {
  try {
    const token = await authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token, status: 'You are successfully logged in!' });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json(err.message);
  }
}

function logOut(req, res, next) {
  try {
    if (req.session) {
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');
    } else {
      const err = new Error('You are not logged in');
      err.status = 403;
      next(err);
    }
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({ err });
  }
}

module.exports = {
  findUser,
  signUp,
  logIn,
  logOut,
};
