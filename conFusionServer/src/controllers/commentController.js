const Dish = require('../models/dishes');

async function getAllComment(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId).populate(
      'comments.author',
    );
    res.setHeader('Content-Type', 'applycation/json');
    return res.json(dish.comments);
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

async function createComment(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId);
    if (dish && req.body.rating && req.body.comment) {
      req.body.author = req.user._id;
      dish.comments.push(req.body);
      dish.save();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applycation/json');
      return res.json('Comment has been added!');
    }
    const err = new Error('Error! Please check and try again!');
    err.status = 404;
    return res.json(err.message);
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

function updateComment(req, res) {
  res.statusCode = 403;
  return res.json(
    `PUT operation not supported on /dishes/${req.params.dishId}/comments.`,
  );
}

async function deleteComment(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId);
    if (dish.comments.length === 0) {
      return res.json('Comment not found. Please try again.');
    } if (dish) {
      for (let i = dish.comments.length - 1; i >= 0; i--) {
        dish.comments.id(dish.comments[i]._id).remove();
      }
      dish.save();
      res.setHeader('Content-Type', 'applycation/json');
      return res.json('Dish has been deleted!');
    }
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

async function getCommentById(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId).populate(
      'comments.author',
    );
    if (!dish.comments.id(req.params.commentId)) {
      res.statusCode = 404;
      return res.json('Comments not found.');
    }
    res.setHeader('Content-Type', 'applycation/json');
    return res.json(dish.comments.id(req.params.commentId));
  } catch (err) {
    res.statusCode = 404;
    return res.json(err.message);
  }
}

function createCommentById(req, res) {
  res.statusCode = 403;
  return res.json(
    `POST operation not supported on /dishes/${req.params.dishId}/comments/${req.params.commentId}`,
  );
}

async function updateCommentById(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId);
    if (
      dish != null
      && dish.comments.id(req.params.commentId) != null
      && dish.comments.id(req.params.commentId).author.equals(req.user._id)
    ) {
      if (req.body.rating) {
        dish.comments.id(req.params.commentId).rating = await req.body.rating;
      }
      if (req.body.comment) {
        dish.comments.id(req.params.commentId).comment = await req.body.comment;
      }
      await dish.save();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json(`Comment ${req.params.commentId} has been updated!`);
    } if (dish == null) {
      const err = new Error(`Dish ${req.params.dishId} not found`);
      err.status = 404;
      return res.json(err.message);
    } if (dish.comments.id(req.params.commentId) == null) {
      const err = new Error(`Comment ${req.params.commentId} not found`);
      err.status = 404;
      return res.json(err.message);
    }
    const err = new Error('You are not authorized to update this comment!');
    err.status = 403;
    return res.json(err.message);
  } catch (err) {
    res.statusCode = 404;
    return res.json(`Update failed comment: ${err.message}`);
  }
}

async function deleteCommentById(req, res) {
  try {
    const dish = await Dish.findById(req.params.dishId);
    if (
      dish !== null
      && dish.comments.id(req.params.commentId) !== null
      && dish.comments.id(req.params.commentId).author.equals(req.user._id)
    ) {
      await dish.comments.id(req.params.commentId).remove();
      dish.save();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json(`Comment ${req.params.commentId} has been deleted!`);
    } if (dish == null) {
      const err = new Error(`Dish ${req.params.dishId} not found`);
      err.status = 404;
      return res.json(err.message);
    } if (dish.comments.id(req.params.commentId) == null) {
      const err = new Error(`Comment ${req.params.commentId} not found`);
      err.status = 404;
      return res.json(err.message);
    }
    const err = new Error('You are not authorized to delete this comment!');
    err.status = 403;
    return res.json(err.message);
  } catch (err) {
    err.status = 404;
    return res.json(err.message);
  }
}

module.exports = {
  getAllComment,
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
  createCommentById,
  updateCommentById,
  deleteCommentById,
};
