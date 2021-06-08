const express = require('express');
const bodyParser = require('body-parser');

const dishController = require('../controllers/dishController');
const authenticate = require('../middlewares/authenticate');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.get('/', dishController.getAllDish);
dishRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, dishController.createDish);
dishRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, dishController.updateDish);
dishRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, dishController.deleteDish);

dishRouter.get('/:dishId', dishController.getDishById);
dishRouter.post('/:dishId', authenticate.verifyUser, authenticate.verifyAdmin, dishController.createDishById);
dishRouter.put('/:dishId', authenticate.verifyUser, authenticate.verifyAdmin, dishController.updateDishById);
dishRouter.delete('/:dishId', authenticate.verifyUser, authenticate.verifyAdmin, dishController.deleteDishById);

module.exports = dishRouter;
