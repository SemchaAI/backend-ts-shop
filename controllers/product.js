const ApiError = require('../exceptions/apiError');
const ProductService = require('../service/product');
const CartService = require('../service/cart');
const FavoriteService = require('../service/favorite');
const RatingService = require('../service/rating');
const { param } = require('express-validator');

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
  // cart section
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
  // favorite section
  async addToFavorite(req, res, next) {
    try {
      const product = await FavoriteService.addProduct(
        req.body.userId,
        req.body.productId
      );
      return res.json(product);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async deleteFromFavorite(req, res, next) {
    try {
      const product = await FavoriteService.deleteProduct(
        req.body.userId,
        req.body.productId
      );
      return res.json(product);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async getFavoriteProducts(req, res, next) {
    try {
      const products = await FavoriteService.getFavoriteProducts(req);
      return res.json(products);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  // rating section
  async rateProduct(req, res, next) {
    try {
      const rating = await RatingService.createRating(req);
      return res.json(rating);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async updateRating(req, res, next) {
    try {
      const rating = await RatingService.updateRating(req);
      return res.json(rating);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async getProductRatings(req, res, next) {
    try {
      const ratings = await RatingService.getRatings(req);
      return res.json(ratings);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async getProductRating(req, res, next) {
    try {
      const rating = await RatingService.getRating(req);
      return res.json(rating);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async checkIsRated(req, res, next) {
    try {
      const isRated = await RatingService.isRated(
        req.body.userId,
        req.body.productId
      );
      return res.json(isRated);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}

module.exports = new ProductController();
