const express = require('express');
const bodyParser = require('body-parser');
const promoController = require('../controllers/promoControler');
const authenticate = require('../middlewares/authenticate');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.get('/', promoController.getAllPromo);
promotionRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, promoController.createPromo);
promotionRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, promoController.updatePromo);
promotionRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, promoController.deletePromo);

promotionRouter.get('/:promotionId', promoController.getPromoById);
promotionRouter.post('/:promotionId', authenticate.verifyUser, authenticate.verifyAdmin, promoController.createPromoById);
promotionRouter.put('/:promotionId', authenticate.verifyUser, authenticate.verifyAdmin, promoController.updatePromoById);
promotionRouter.delete('/:promotionId', authenticate.verifyUser, authenticate.verifyAdmin, promoController.deletePromoById);

module.exports = promotionRouter;
