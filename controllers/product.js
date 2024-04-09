const ApiError = require('../exceptions/apiError');
const ProductService = require('../service/product');
const CartService = require('../service/cart');

class ProductController {
  async createProduct(req, res, next) {
    try {
      // console.log(req.body);
      const productData = await ProductService.createProducts(req);
      return res.json(productData);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async getProducts(req, res, next) {
    try {
      const { products, total, page } = await ProductService.getAllProducts(
        req
      );
      return res.json({ products, total, page });
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async getProduct(req, res, next) {
    try {
      const product = await ProductService.getOneProduct(req.params.id);
      return res.json(product);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async addToCart(req, res, next) {
    try {
      const product = await CartService.addProduct(
        req.body.userId,
        req.body.productId
      );
      return res.json(product);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async deleteFromCart(req, res, next) {
    try {
      const product = await CartService.deleteProduct(
        req.body.userId,
        req.body.productId
      );
      return res.json(product);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async getCartProducts(req, res, next) {
    try {
      const products = await CartService.getCartProducts(req);
      return res.json(products);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}

module.exports = new ProductController();
