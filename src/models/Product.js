import productModel from '../database/product';

export default class Product {
  static async createProduct(body) {
    const newProduct = await productModel.create(body);

    return newProduct;
  }

  static async getProduct(name) {
    const prodcuct = await productModel.findOne({ name });

    return prodcuct;
  }

  static async allProducts() {
    const prodcucts = await productModel.find();

    return prodcucts;
  }

  static async updateProduct(name, body) {
    const product = await this.getProduct(name);
    const updateProduct = await product.updateOne(body, { new: true });

    return updateProduct;
  }

  static async deleteProduct(name) {
    const product = await this.getProduct(name);
    const productDeleted = await product.deleteOne();

    return productDeleted;
  }
}
