const {
  FavoriteModel,
  FavoriteProduct: FavoriteProductModel,
} = require('../models/favorite');
const ProductModel = require('../models/product');
const ApiError = require('../exceptions/apiError');

class FavoriteService {
  async create(id) {
    const candidate = await FavoriteModel.findOne({ userId: id });
    // console.log(candidate);
    if (candidate) {
      throw ApiError.BadRequest(
        `Избранное для этого пользователя уже существует`
      );
    }
    const favorite = await FavoriteModel.create({ userId: id, products: [] });
    // console.log(favorite);
    //test
    return favorite;
  }
  async addProduct(userId, productId) {
    const favorite = await FavoriteModel.findOne({ userId });
    if (!favorite) {
      throw ApiError.BadRequest(
        `Избранное для этого пользователя не существует`
      );
    }
    const FavoriteProduct = await FavoriteProductModel.create({
      productId,
      favoriteId: favorite._id,
    });
    return FavoriteProduct;
  }
  async deleteProduct(userId, productId) {
    const favorite = await FavoriteModel.findOne({ userId });
    if (!favorite) {
      throw ApiError.BadRequest(
        `Избранное для этого пользователя не существует`
      );
    }
    const FavoriteProduct = await FavoriteProductModel.deleteOne({
      productId,
    });
    return FavoriteProduct;
  }
  async getFavoriteProducts(req) {
    let { userId } = req.query;
    const products = [];

    const favorite = await FavoriteModel.findOne({ userId });
    if (!favorite) {
      throw ApiError.BadRequest(
        `Избранное для этого пользователя не существует`
      );
    }
    const FavoriteProducts = await FavoriteProductModel.find({
      favoriteId: favorite._id,
    });
    // I NEED TO CHECK THIS TECHNIQUE
    await Promise.all(
      FavoriteProducts.map(async (i) => {
        const product = await ProductModel.findOne({ _id: i.productId });
        products.push(product);
      })
    );
    return products;
  }
}

module.exports = new FavoriteService();
