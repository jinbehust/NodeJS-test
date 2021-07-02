const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('../middlewares/cors');
const userController = require('../controllers/users');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, userController.findUser);

router.post('/signup', cors.corsWithOptions, userController.signUp);

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), userController.logIn);

router.get('/logout', cors.corsWithOptions, userController.logOut);

router.get('/facebook/token', passport.authenticate('facebook-token'), userController.oAuthFacebook);

module.exports = router;
