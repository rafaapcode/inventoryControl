import Router from 'express';
import { createUser } from '../controllers/UserController.js';

const userRouter = new Router();

userRouter.post('/', createUser);

export default userRouter;
