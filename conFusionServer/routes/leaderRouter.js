const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const Leader = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const leaders = await Leader.find({});
      res.setHeader('Content-Type', 'applycation/json');
      return res.json(leaders);
    } catch (err) {
      res.statusCode = 404;
      return res.json(`Leader not found: ${err.message}`);
    }
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
    try {
      const leaders = await Leader.findOne({
        name: req.body.name,
      }).exec();
      if (leaders) {
        res.statusCode = 409;
        return res.json('Leader exists. Please try again!');
      }
      const leader = await Leader.create(req.body);
      res.setHeader('Content-Type', 'applycation/json');
      return res.json(leader);
    } catch (err) {
      res.statusCode = 500;
      return res.json(`Leader added failed: ${err.message}`);
    }
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    return res.json('PUT operation not supported on /leaders');
  })
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
    try {
      const leaders = await Leader.find({});
      if (leaders.length === 0) {
        res.statusCode = 404;
        return res.json('Leader does not exist.');
      }
      await Leader.deleteMany({});
      res.setHeader('Content-Type', 'application/json');
      return res.json('All leaders have been deleted!');
    } catch (err) {
      res.statusCode = 404;
      return res.json(`Failure. Please try again: ${err.message}`);
    }
  });

leaderRouter
  .route('/:leaderId')
  .get(async (req, res, next) => {
    try {
      const leader = await Leader.findById(req.params.leaderId);
      if (!leader) {
        res.statusCode = 404;
        return res.json(`Leader ${req.params.leaderId} not found!`);
      }
      res.setHeader('Content-Type', 'applycation/json');
      res.json(leader);
    } catch (err) {
      res.statusCode = 404;
      return res.json(`Failure. Please try again: ${err.message}`);
    }
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    return res.end(
      `POST operation not supported on /leaders/${req.params.leaderId}`,
    );
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
    try {
      const leaderUpdate = await Leader.findByIdAndUpdate(
        req.params.leaderId,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.setHeader('Content-Type', 'application/json');
      return res.json(leaderUpdate);
    } catch (err) {
      res.statusCode = 404;
      return res.json(`Leader ${req.params.leaderId} not found!`);
    }
  })
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
    try {
      const leader = await Leader.findByIdAndRemove(req.params.leaderId);
      if (!leader) {
        res.statusCode = 404;
        return res.json('Leader not found. Please try again.');
      }
      res.setHeader('Content-Type', 'application/json');
      return res.json('Leader has been deleted!');
    } catch (err) {
      res.statusCode = 404;
      return res.json(`Failure. Please try again: ${err.message}`);
    }
  });

module.exports = leaderRouter;
