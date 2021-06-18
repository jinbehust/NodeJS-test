const express = require('express');
const bodyParser = require('body-parser');

const cors = require('../middlewares/cors');
const favoriteController = require('../controllers/favoriteController');
const authenticate = require('../middlewares/authenticate');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.options('/', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
favoriteRouter.get('/', cors.corsWithOptions, authenticate.verifyUser, favoriteController.getAllFavorite);
favoriteRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, favoriteController.createFavorite);
favoriteRouter.put('/', cors.corsWithOptions, authenticate.verifyUser, favoriteController.updateFavorite);
favoriteRouter.delete('/', cors.corsWithOptions, authenticate.verifyUser, favoriteController.deleteFavorite);

favoriteRouter.options('/:dishId', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
favoriteRouter.get('/:dishId', cors.corsWithOptions, authenticate.verifyUser, favoriteController.getFavoriteById);
favoriteRouter.post('/:dishId', cors.corsWithOptions, authenticate.verifyUser, favoriteController.createFavoriteById);
favoriteRouter.put('/:dishId', cors.corsWithOptions, authenticate.verifyUser, favoriteController.updateFavoriteById);
favoriteRouter.delete('/:dishId', cors.corsWithOptions, authenticate.verifyUser, favoriteController.deleteFavoriteById);

module.exports = favoriteRouter;
