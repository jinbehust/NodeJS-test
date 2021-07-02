const express = require('express');
const bodyParser = require('body-parser');

const cors = require('../middlewares/cors');
const commentController = require('../controllers/commentController');
const authenticate = require('../middlewares/authenticate');

const commentRouter = express.Router();

commentRouter.use(bodyParser.json());

commentRouter.options('/:dishId/comments', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
commentRouter.get('/:dishId/comments', cors.cors, commentController.getAllComment);
commentRouter.post('/:dishId/comments', authenticate.verifyUser, commentController.createComment);
commentRouter.put('/:dishId/comments', authenticate.verifyUser, commentController.updateComment);
commentRouter.delete('/:dishId/comments', authenticate.verifyUser, authenticate.verifyAdmin, commentController.deleteComment);

commentRouter.options('/:dishId/comments/:commentId', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
commentRouter.get('/:dishId/comments/:commentId', cors.cors, commentController.getCommentById);
commentRouter.post('/:dishId/comments/:commentId', cors.corsWithOptions, authenticate.verifyUser, commentController.createCommentById);
commentRouter.put('/:dishId/comments/:commentId', cors.corsWithOptions, authenticate.verifyUser, commentController.updateCommentById);
commentRouter.delete('/:dishId/comments/:commentId', cors.corsWithOptions, authenticate.verifyUser, commentController.deleteCommentById);

module.exports = commentRouter;
