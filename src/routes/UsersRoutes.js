import Router from 'express';
import UserController from '../controllers/UserController.js';

const userRouter = new Router();

userRouter.post('/', UserController.createUser);
userRouter.post('/getuser', UserController.getUser);

export default userRouter;
