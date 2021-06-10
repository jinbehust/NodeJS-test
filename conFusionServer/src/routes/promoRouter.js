const express = require('express');
const bodyParser = require('body-parser');

const cors = require('../middlewares/cors');
const promoController = require('../controllers/promoControler');
const authenticate = require('../middlewares/authenticate');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.options('/', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
promotionRouter.get('/', cors.cors, promoController.getAllPromo);
promotionRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promoController.createPromo);
promotionRouter.put('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promoController.updatePromo);
promotionRouter.delete('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promoController.deletePromo);

promotionRouter.options('/:promotionId', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
promotionRouter.get('/:promotionId', cors.cors, promoController.getPromoById);
promotionRouter.post('/:promotionId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promoController.createPromoById);
promotionRouter.put('/:promotionId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promoController.updatePromoById);
promotionRouter.delete('/:promotionId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, promoController.deletePromoById);

module.exports = promotionRouter;
