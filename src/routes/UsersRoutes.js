import Router from 'express';
import { createUser, getUser } from '../controllers/UserController.js';

const userRouter = new Router();

userRouter.post('/', createUser);
userRouter.post('/getuser', getUser);

export default userRouter;
