const express = require('express');
const bodyParser = require('body-parser');
const leaderController = require('../controllers/leaderController');
const authenticate = require('../middlewares/authenticate');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.get('/', leaderController.findAllLeader);
leaderRouter.post('/', authenticate.verifyUser, authenticate.verifyAdmin, leaderController.createLeader);
leaderRouter.put('/', authenticate.verifyUser, authenticate.verifyAdmin, leaderController.updateLeader);
leaderRouter.delete('/', authenticate.verifyUser, authenticate.verifyAdmin, leaderController.deleteLeader);

leaderRouter.get('/:leaderId', leaderController.getLeaderById);
leaderRouter.post('/:leaderId', authenticate.verifyUser, authenticate.verifyAdmin, leaderController.createLeaderById);
leaderRouter.put('/:leaderId', authenticate.verifyUser, authenticate.verifyAdmin, leaderController.updateLeaderById);
leaderRouter.delete('/:leaderId', authenticate.verifyUser, authenticate.verifyAdmin, leaderController.deleteLeaderById);

module.exports = leaderRouter;
