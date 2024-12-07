import { Router } from 'express';
import { commentsController } from '../controllers/commentsController.js';
import validators from '../middlewares/validator.js';


const commentRouter = Router();

// MESSAGE ON A SUBJECT IN THE FORUM

// Create a message
commentRouter.post(
    '/api/topics/:topic_id(\\d+)/message',
    validators('comments'),
    commentsController.createComment);

// Modify a message
commentRouter.patch('/api/topics/:topic_id(\\d+)/message/:com_id(\\d+)'
    ,validators('comments'),
    commentsController.updateComment);

// Delete a message
commentRouter.delete('/api/topics/message/:com_id(\\d+)',
    commentsController.deleteComment);

export { commentRouter };
