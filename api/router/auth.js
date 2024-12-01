import { Router } from 'express';
import { authController } from '../controllers/auth/authController.js';
import isLoggedIn from '../middlewares/verifyToken.js';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);
authRouter.get('/my-infos', isLoggedIn, authController.myInfos);

export { authRouter };
