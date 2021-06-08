const express = require('express');
const passport = require('passport');
const userController = require('../controllers/users');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

/* GET users listing. */
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, userController.findUser);

router.post('/signup', userController.signUp);

router.post('/login', passport.authenticate('local'), userController.logIn);

router.get('/logout', userController.logOut);

module.exports = router;
