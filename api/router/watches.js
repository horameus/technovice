import { Router } from 'express';
import { watchesController } from '../controllers/watchesController.js';
import isLoggedIn from '../middlewares/verifyToken.js';

const watchesRouter = Router();

// get all watches
watchesRouter.get('/api/watches/users/:user_id(\\d+)', isLoggedIn, watchesController.getAllWatchesByUserId);

// add a course to the list of courses started by a user
watchesRouter.post(
    '/api/watches/courses/:course_id(\\d+)/users/:user_id(\\d+)',
    isLoggedIn,
    watchesController.createWatch,
);

// delete a course from the list of courses started by a user
watchesRouter.delete(
    '/api/watches/courses/:course_id(\\d+)/users/:user_id(\\d+)',
    isLoggedIn,
    watchesController.deleteWatch,
);

export { watchesRouter };
