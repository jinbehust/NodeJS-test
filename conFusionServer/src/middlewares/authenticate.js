const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const FacebookTokenStrategy = require('passport-facebook-token');

const User = require('../models/user');
const config = require('../../config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => jwt.sign(user, config.secretKey, { expiresIn: 3600 });

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ _id: jwtPayload._id });
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user && user.admin) {
      return next();
    }
    const err = new Error(
      'You are not authorized to perform this operation!',
    );
    err.status = 400;
    res.json(err.message);
    return next(err);
  } catch (err) {
    return res.json(err.message);
  }
};

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookId: profile.id }, (error, user) => done(error, user));
}));
