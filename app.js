import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expressUi from 'swagger-ui-express';
import userRouter from './src/routes/UsersRoutes.js';
import productRoute from './src/routes/ProductsRoute';
import buyRoute from './src/routes/Buy.js';
import swaggerConfig from './src/swagger.json';

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
    this.app.use('/buy', buyRoute);
    this.app.use('/api-docs', expressUi.serve, expressUi.setup(swaggerConfig));
  }

  database() {
    mongoose.connect(process.env.DATABASE_URL);
  }
}

export default new App().app;
