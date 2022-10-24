import Product from '../models/Product';

export default class BuyController {
  static async buy(req, res) {
    try {
      const quantityTobuy = req.body.quantity;

      const productSell = await Product.getProduct(req.body.name);
      if (req.body.quantity > productSell.quantity) {
        return res.status(400).json({ message: 'We do not have this amount of products in stock.' });
      }

      if (!productSell) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      req.body = {
        name: req.body.name,
        price: productSell.price,
        quantity: productSell.quantity -= req.body.quantity,
      };

      await Product.updateProduct(req.body.name, req.body);

      return res.json({ message: `You buy ${quantityTobuy} ${productSell.name}, spend: R$ ${productSell.price * req.body.quantity}` });
    } catch (e) {
      return res.status(404).json({ message: 'Product not found.' });
    }
  }
}
