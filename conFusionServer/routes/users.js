const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const authenticate = require('../authenticate');

const router = express.Router();

/* GET users listing. */
router.get(
  '/',
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  async (req, res, next) => {
    const users = await User.find({});
    if (users) {
      return res.json(users);
    }
  },
);

router.post('/signup', async (req, res, next) => {
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
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  try {
    const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token, status: 'You are successfully logged in!' });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({ err });
  }
});

router.get('/logout', (req, res, next) => {
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
});

module.exports = router;
