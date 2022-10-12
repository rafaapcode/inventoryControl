import Product from '../models/Product.js';

export default class ProductController {
  static async createProduct(req, res) {
    const newProduct = await Product.createProduct(req.body);

    return res.json(newProduct);
  }

  static async getProduct(req, res) {
    const { name } = req.params;
    const product = await Product.getProduct(name);

    return res.json(product);
  }

  static async getAllProducts(req, res) {
    const products = await Product.allProducts();

    return res.json(products);
  }

  static async updateProducts(req, res) {
    await Product.updateProduct(req.params.name, req.body);

    return res.json({ message: 'Product updated successfully.' });
  }

  static async deleteProducts(req, res) {
    await Product.deleteProduct(req.params.name);

    return res.json({ message: 'Product deleted successfully.' });
  }
}
