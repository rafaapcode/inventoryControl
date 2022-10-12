import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './src/routes/UsersRoutes.js';
import productRoute from './src/routes/ProductsRoute';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set('port', process.env.PORT);
  }

  routes() {
    this.app.use('/users?', userRouter);
    this.app.use('/products?', productRoute);
  }

  database() {
    mongoose.connect(process.env.DATABASE_URL);
  }
}

export default new App().app;
