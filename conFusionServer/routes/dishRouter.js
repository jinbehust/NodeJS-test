const express = require('express');
const bodyParser = require('body-parser');

const Dish = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const dishes = await Dish.find({});
      res.setHeader('Content-Type', 'applycation/json');
      return res.json(dishes);
    } catch (err) {
      res.statusCode = 404;
      return res.json('Dish not found.');
    }
  })
  .post(async (req, res, next) => {
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
      return res.json('Dish added failed.');
    }
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    return res.json('PUT operation not supported on /dishes');
  })
  .delete(async (req, res, next) => {
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
      return res.json('Failure. Please try again.');
    }
  });

dishRouter
  .route('/:dishId')
  .get(async (req, res, next) => {
    try {
      const dish = await Dish.findById(req.params.dishId);
      if (!dish) {
        res.statusCode = 404;
        return res.json('Dish ' + req.params.dishId + ' not found!');
      }
      res.setHeader('Content-Type', 'applycation/json');
      res.json(dish);
    } catch (err) {
      res.statusCode = 404;
      return res.json('Failure. Please try again.');
    }
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    return res.end(
      'POST operation not supported on /dishes/' + req.params.dishId
    );
  })
  .put(async (req, res, next) => {
    try {
      const dishUpdate = await Dish.findByIdAndUpdate(
        req.params.dishId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.setHeader('Content-Type', 'application/json');
      return res.json(dishUpdate);
    } catch (err) {
      res.statusCode = 404;
      return res.json('Dish ' + req.params.dishId + ' not found!');
    }
  })
  .delete(async (req, res, next) => {
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
      return res.json('Failure. Please try again.');
    }
  });

dishRouter
  .route('/:dishId/comments')
  .get(async (req, res, next) => {
    try {
      console.log(req.params.dishId);
      const dish = await Dish.findById(req.params.dishId);
      res.setHeader('Content-Type', 'applycation/json');
      return res.json(dish.comments);
    } catch (err) {
      res.statusCode = 404;
      return res.json('Read failed comments!');
    }
  })
  .post(async (req, res, next) => {
    try {
      const dish = await Dish.findById(req.params.dishId);
      if (dish) {
        dish.comments.push(req.body);
        dish.save();
        res.setHeader('Content-Type', 'applycation/json');
        return res.json(dish.comments);
      }
    } catch (err) {
      res.statusCode = 404;
      return res.json('Comment added failed!');
    }
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    return res.json(
      'PUT operation not supported on /dishes/' +
        req.params.dishId +
        '/comments.'
    );
  })
  .delete(async (req, res, next) => {
    try {
      const dish = await Dish.findById(req.params.dishId);
      console.log(dish);
      if (dish.comments.length === 0) {
        return res.json('Comment not found. Please try again.');
      }
      if (dish) {
        for (var i = dish.comments.length - 1; i >= 0; i--) {
          dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save();
        res.setHeader('Content-Type', 'applycation/json');
        return res.json('Dish has been deleted!');
      }
    } catch (err) {
      res.statusCode = 404;
      console.log(err.message);
      return res.json('Err: ' + err.message);
    }
  });

dishRouter
  .route('/:dishId/comments/:commentId')
  .get(async (req, res, next) => {
    try {
      const dish = await Dish.findById(req.params.dishId);
      if (!dish.comments.id(req.params.commentId)) {
        res.statusCode = 404;
        return res.json('Comments not found.');
      }
      res.setHeader('Content-Type', 'applycation/json');
      return res.json(dish.comments.id(req.params.commentId));
    } catch (err) {
      res.statusCode = 404;
      return res.json('Read failed comment: ' + err.message);
    }
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    return res.json(
      'POST operation not supported on /dishes/' +
        req.params.dishId +
        '/comments/' +
        req.params.commentId
    );
  })
  .put(async (req, res, next) => {
    try {
      const dish = await Dish.findById(req.params.dishId);
      if (dish !== null && dish.comments.id(req.params.commentId) !== null) {
        if (req.body.rating) {
          dish.comments.id(req.params.commentId).rating = await req.body.rating;
        }
        if (req.body.comment) {
          dish.comments.id(req.params.commentId).comment = await req.body
            .comment;
        }
        await dish.save();
        res.setHeader('Content-Type', 'applycation/json');
        return res.json(dish.comments.id(req.params.commentId));
      }
      if (dish === null) {
        err = new Error('Dish ' + req.params.dishId + ' not found.');
        err.statusCode = 404;
        return res.json(err.message);
      } else {
        err = new Error('Comment ' + req.params.commentId + ' not found.');
        err.statusCode = 404;
        return res.json(err.message);
      }
    } catch (err) {
      res.statusCode = 404;
      return res.json('Update failed comment: ' + err.message);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const dish = await Dish.findById(req.params.dishId);
      console.log(dish.comments);
      if (dish.comments.id(req.params.commentId) === null) {
        return res.json('Comment not found. Please try again.');
      }
      if (dish) {
        dish.comments.id(dish.comments.id(req.params.commentId)).remove();
        dish.save();
        res.setHeader('Content-Type', 'applycation/json');
        return res.json('Comment has been deleted!');
      }
    } catch (err) {
      res.statusCode = 404;
      return res.json('Delete failed comment: ' + err.message);
    }
  });

module.exports = dishRouter;
