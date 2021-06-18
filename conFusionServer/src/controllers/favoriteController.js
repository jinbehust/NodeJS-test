const Favorite = require('../models/favorites');

async function getAllFavorite(req, res) {
  try {
    const favorites = await Favorite.findOne({ user: req.user._id }).populate('user').populate('dishes');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.json(favorites);
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

async function createFavorite(req, res) {
  res.statusCode = 403;
  return res.end(
    `POST operation not supported on /favorites`,
  );
}

function updateFavorite(req, res) {
  res.statusCode = 403;
  return res.end(
    `PUT operation not supported on /favorites`,
  );
}

async function deleteFavorite(req, res) {
  try {
    const favorites = await Favorite.find({}).populate('user').populate('dishes');
    if (favorites.length === 0) {
      res.statusCode = 404;
      return res.json('Favorite dish does not exist.');
    }
    await Favorite.deleteMany({});
    res.setHeader('Content-Type', 'application/json');
    return res.json('All favorite dish have been deleted!');
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

function getFavoriteById(req, res) {
  res.statusCode = 403;
  return res.end(
    `GET operation not supported on /favorites/${req.params.dishId}`,
  );
}

async function createFavoriteById(req, res) {
  try {
    const favorite = await Favorite.findOne({user: req.user._id});
    if(favorite){
      if (favorite.dishes.indexOf(req.params.dishId) === -1) {
        favorite.dishes.push(req.params.dishId);
        favorite.save();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(favorite);
      }
    } else {
      const favorite = await Favorite.create({'user': req.user._id, 'dishes': [req.params.dishId] });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json(favorite);
    }
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

function updateFavoriteById(req, res) {
  res.statusCode = 403;
  return res.end(
    `PUT operation not supported on /favorites/${req.params.dishId}`,
  );
}

async function deleteFavoriteById(req, res) {
  try {
    const favorite = await Favorite.findOne({user: req.user._id}).populate('user').populate('dishes');
    if (favorite) {            
      let index = favorite.dishes.indexOf(req.params.dishId);
      if (index >= 0) {
        favorite.dishes.splice(index, 1);
        favorite.save();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }
      else {
        const err = new Error(`Dish ${req.params.dishId} not found!`);
        err.status = 404;
        return res.json(err.message);
      }
    } else {
      const err = new Error('Favorites not found');
      err.status = 404;
      return res.json(err.message);
    }
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

module.exports = {
  getAllFavorite,
  createFavorite,
  updateFavorite,
  deleteFavorite,
  getFavoriteById,
  createFavoriteById,
  updateFavoriteById,
  deleteFavoriteById,
};
