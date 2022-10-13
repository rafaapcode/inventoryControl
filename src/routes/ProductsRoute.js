import Router from 'express';
import ProductController from '../controllers/ProductController.js';
import authUser from '../middlewares/auth.js';

const productRoute = new Router();

productRoute.get('/all', ProductController.getAllProducts);
productRoute.post('/', authUser, ProductController.createProduct);
productRoute.get('/:name', ProductController.getProduct);
productRoute.put('/:name', authUser, ProductController.updateProducts);
productRoute.delete('/:name', authUser, ProductController.deleteProducts);

export default productRoute;
