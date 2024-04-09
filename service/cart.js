const { CartModel, CartProduct: CartProductModel } = require('../models/cart');
const ProductModel = require('../models/product');
const ApiError = require('../exceptions/apiError');

class CartService {
  async create(id) {
    const candidate = await CartModel.findOne({ userId: id });
    // console.log(candidate);
    if (candidate) {
      throw ApiError.BadRequest(
        `Корзина для этого пользователя уже существует`
      );
    }
    const cart = await CartModel.create({ userId: id, products: [] });
    // console.log(cart);
    //test
    return cart;
  }
  async addProduct(userId, productId) {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      throw ApiError.BadRequest(`Корзина для этого пользователя не существует`);
    }
    const CartProduct = await CartProductModel.create({
      productId,
      cartId: cart._id,
    });
    return CartProduct;
  }
  async deleteProduct(userId, productId) {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      throw ApiError.BadRequest(`Корзина для этого пользователя не существует`);
    }
    const CartProduct = await CartProductModel.deleteOne({
      productId,
    });
    return CartProduct;
  }
  async getCartProducts(req) {
    let { userId } = req.query;
    const products = [];

    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      throw ApiError.BadRequest(`Корзина для этого пользователя не существует`);
    }
    const CartProducts = await CartProductModel.find({
      cartId: cart._id,
    });
    // I NEED TO CHECK THIS TECHNIQUE
    await Promise.all(
      CartProducts.map(async (i) => {
        const product = await ProductModel.findOne({ _id: i.productId });
        products.push(product);
      })
    );
    return products;
  }
}

module.exports = new CartService();
