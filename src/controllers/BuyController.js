import Product from '../models/Product';

export default class BuyController {
  static async buy(req, res) {
    const quantityTobuy = req.body.quantity;

    const productSell = await Product.getProduct(req.body.name);
    if (req.body.quantity > productSell.quantity) {
      return res.status(400).json({ message: 'You cant buy more products that we have in stock.' });
    }

    req.body = {
      name: req.body.name,
      price: productSell.price,
      quantity: productSell.quantity -= req.body.quantity,
    };

    await Product.updateProduct(req.body.name, req.body);

    return res.json({ message: `You buy ${quantityTobuy} ${productSell.name}, spend: R$ ${productSell.price * req.body.quantity}` });
  }
}
