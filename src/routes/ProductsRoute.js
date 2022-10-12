import Router from 'express';
import ProductController from '../controllers/ProductController.js';

const productRoute = new Router();

productRoute.get('/all', ProductController.getAllProducts);
productRoute.post('/', ProductController.createProduct);
productRoute.get('/:name', ProductController.getProduct);
productRoute.put('/:name', ProductController.updateProducts);
productRoute.delete('/:name', ProductController.deleteProducts);

export default productRoute;
