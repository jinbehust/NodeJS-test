const Promotion = require('../models/promotions');

async function getAllPromo(req, res) {
  try {
    const promotions = await Promotion.find({});
    res.setHeader('Content-Type', 'applycation/json');
    return res.json(promotions);
  } catch (err) {
    res.statusCode = 404;
    return res.json(`Promotion not found: ${err.message}`);
  }
}

async function createPromo(req, res) {
  try {
    const promotions = await Promotion.findOne({
      name: req.body.name,
    }).exec();
    if (promotions) {
      res.statusCode = 409;
      return res.json('Promotion exists. Please try again!');
    }
    const promotion = await Promotion.create(req.body);
    res.setHeader('Content-Type', 'applycation/json');
    return res.json(promotion);
  } catch (err) {
    res.statusCode = 500;
    return res.json(`Promotion added failed: ${err.message}`);
  }
}

function updatePromo(req, res) {
  res.statusCode = 403;
  return res.json('PUT operation not supported on /promotions');
}

async function deletePromo(req, res) {
  try {
    const promotions = await Promotion.find({});
    if (promotions.length === 0) {
      res.statusCode = 404;
      return res.json('Promotion does not exist.');
    }
    await Promotion.deleteMany({});
    res.setHeader('Content-Type', 'application/json');
    return res.json('All promotions have been deleted!');
  } catch (err) {
    res.statusCode = 404;
    return res.json(`Failure. Please try again: ${err.message}`);
  }
}

async function getPromoById(req, res) {
  try {
    const promotion = await Promotion.findById(req.params.promotionId);
    if (!promotion) {
      res.statusCode = 404;
      return res.json(`Promotion ${req.params.promotionId} not found!`);
    }
    res.setHeader('Content-Type', 'applycation/json');
    return res.json(promotion);
  } catch (err) {
    res.statusCode = 404;
    return res.json(`Failure. Please try again: ${err.message}`);
  }
}

function createPromoById(req, res) {
  res.statusCode = 403;
  return res.end(
    `POST operation not supported on /promotions/${req.params.promotionId}`,
  );
}

async function updatePromoById(req, res) {
  try {
    const promotionUpdate = await Promotion.findByIdAndUpdate(
      req.params.promotionId,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.setHeader('Content-Type', 'application/json');
    return res.json(promotionUpdate);
  } catch (err) {
    res.statusCode = 404;
    return res.json(`Promotion ${req.params.promotionId} not found!`);
  }
}

async function deletePromoById(req, res) {
  try {
    const promotion = await Promotion.findByIdAndRemove(
      req.params.promotionId,
    );
    if (!promotion) {
      res.statusCode = 404;
      return res.json('Promotion not found. Please try again.');
    }
    res.setHeader('Content-Type', 'application/json');
    return res.json('Promotion has been deleted!');
  } catch (err) {
    res.statusCode = 404;
    return res.json(`Failure. Please try again: ${err.message}`);
  }
}

module.exports = {
  getAllPromo,
  createPromo,
  updatePromo,
  deletePromo,
  getPromoById,
  createPromoById,
  updatePromoById,
  deletePromoById,
};
