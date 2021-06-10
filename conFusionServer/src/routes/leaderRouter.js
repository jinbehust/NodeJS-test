const express = require('express');
const bodyParser = require('body-parser');

const cors = require('../middlewares/cors');
const leaderController = require('../controllers/leaderController');
const authenticate = require('../middlewares/authenticate');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.options('/', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
leaderRouter.get('/', cors.cors, leaderController.findAllLeader);
leaderRouter.post('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, leaderController.createLeader);
leaderRouter.put('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, leaderController.updateLeader);
leaderRouter.delete('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, leaderController.deleteLeader);

leaderRouter.options('/:leaderId', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
leaderRouter.get('/:leaderId', cors.cors, leaderController.getLeaderById);
leaderRouter.post('/:leaderId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, leaderController.createLeaderById);
leaderRouter.put('/:leaderId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, leaderController.updateLeaderById);
leaderRouter.delete('/:leaderId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, leaderController.deleteLeaderById);

module.exports = leaderRouter;
