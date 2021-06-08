const express = require('express');
const bodyParser = require('body-parser');

const commentController = require('../controllers/commentController');
const authenticate = require('../middlewares/authenticate');

const commentRouter = express.Router();

commentRouter.use(bodyParser.json());

commentRouter.get('/:dishId/comments', commentController.getAllComment);
commentRouter.post('/:dishId/comments', authenticate.verifyUser, commentController.createComment);
commentRouter.put('/:dishId/comments', authenticate.verifyUser, commentController.updateComment);
commentRouter.delete('/:dishId/comments', authenticate.verifyUser, authenticate.verifyAdmin, commentController.deleteComment);

commentRouter.get('/:dishId/comments/:commentId', commentController.getCommentById);
commentRouter.post('/:dishId/comments/:commentId', authenticate.verifyUser, commentController.createCommentById);
commentRouter.put('/:dishId/comments/:commentId', authenticate.verifyUser, commentController.updateCommentById);
commentRouter.delete('/:dishId/comments/:commentId', authenticate.verifyUser, commentController.deleteCommentById);

module.exports = commentRouter;
