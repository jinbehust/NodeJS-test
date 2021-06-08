const Dish = require('../models/dishes');

async function getAllDish(req, res) {
  try {
    const dishes = await Dish.find({}).populate('comments.author');
    res.setHeader('Content-Type', 'applycation/json');
    return res.json(dishes);
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

async function createDish(req, res) {
  try {
    const dishes = await Dish.findOne({ name: req.body.name }).exec();
    if (dishes) {
      res.statusCode = 409;
      return res.json('Dish exists. Please try again!');
    }
    const dish = await Dish.create(req.body);
    res.setHeader('Content-Type', 'applycation/json');
    return res.json(dish);
  } catch (err) {
    res.statusCode = 500;
    return res.json(err.message);
  }
}

function updateDish(req, res) {
  res.statusCode = 403;
  return res.json('PUT operation not supported on /dishes');
}

async function deleteDish(req, res) {
  try {
    const dishes = await Dish.find({});
    if (dishes.length === 0) {
      res.statusCode = 404;
      return res.json('Dish does not exist.');
    }
    await Dish.deleteMany({});
    res.setHeader('Content-Type', 'application/json');
    return res.json('All dishes have been deleted!');
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

async function getDishById(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId).populate(
      'comments.author',
    );
    if (!dish) {
      res.statusCode = 404;
      return res.json(`Dish ${req.params.dishId} not found!`);
    }
    res.setHeader('Content-Type', 'applycation/json');
    return res.json(dish);
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

function createDishById(req, res) {
  res.statusCode = 403;
  return res.end(
    `POST operation not supported on /dishes/${req.params.dishId}`,
  );
}

async function updateDishById(req, res) {
  try {
    const dishUpdate = await Dish.findByIdAndUpdate(
      req.params.dishId,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.setHeader('Content-Type', 'application/json');
    return res.json(dishUpdate);
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

async function deleteDishById(req, res) {
  try {
    const dish = await Dish.findByIdAndRemove(req.params.dishId);
    if (!dish) {
      res.statusCode = 404;
      return res.json('Dish not found. Please try again.');
    }
    res.setHeader('Content-Type', 'application/json');
    return res.json('Dish has been deleted!');
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

module.exports = {
  getAllDish,
  createDish,
  updateDish,
  deleteDish,
  getDishById,
  createDishById,
  updateDishById,
  deleteDishById,
};
