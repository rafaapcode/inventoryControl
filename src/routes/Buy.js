import Router from 'express';
import buy from '../controllers/BuyController.js';

const buyRoute = new Router();

buyRoute.post('/', buy.buy);

export default buyRoute;
