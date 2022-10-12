import Product from '../models/Product.js';

export default class ProductController {
  static async createProduct(req, res) {
    try {
      const newProduct = await Product.createProduct(req.body);

      return res.json(newProduct);
    } catch (error) {
      res.staus(500).json({ error: 'Errot to create a product' });
    }
  }

  static async getProduct(req, res) {
    try {
      const { name } = req.params;
      const product = await Product.getProduct(name);

      if (!product) {
        res.json({ error: 'Product not found' });
      }

      return res.json(product);
    } catch (error) {
      res.staus(404).json(null);
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.allProducts();

      if (!products) {
        res.json(null);
      }

      return res.json(products);
    } catch (error) {
      res.staus(404).json(null);
    }
  }

  static async updateProducts(req, res) {
    try {
      await Product.updateProduct(req.params.name, req.body);

      return res.json({ message: 'Product updated successfully.' });
    } catch (error) {
      res.staus(404).json({ error: 'Product not found' });
    }
  }

  static async deleteProducts(req, res) {
    try {
      await Product.deleteProduct(req.params.name);

      return res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
      res.staus(404).json({ error: 'Product not found' });
    }
  }
}
