const express = require('express');
const bodyParser = require('body-parser');

const cors = require('../middlewares/cors');
const dishController = require('../controllers/dishController');
const authenticate = require('../middlewares/authenticate');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.options('/', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
dishRouter.get('/', cors.cors, dishController.getAllDish);
dishRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.createDish);
dishRouter.put('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.updateDish);
dishRouter.delete('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.deleteDish);

dishRouter.options('/:dishId', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
dishRouter.get('/:dishId', cors.cors, dishController.getDishById);
dishRouter.post('/:dishId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.createDishById);
dishRouter.put('/:dishId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.updateDishById);
dishRouter.delete('/:dishId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.deleteDishById);

module.exports = dishRouter;
