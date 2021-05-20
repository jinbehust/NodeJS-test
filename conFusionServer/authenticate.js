const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => jwt.sign(user, config.secretKey, { expiresIn: 3600 });

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    console.log('JWT payload: ', jwtPayload);
    try {
      const user = await User.findOne({ id: jwtPayload.sub });
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);
