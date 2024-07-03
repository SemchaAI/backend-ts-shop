const RatingModel = require('../models/rating');
const ProductModel = require('../models/product');
const UserModel = require('../models/user');
const ApiError = require('../exceptions/apiError');

class RatingService {
  async createRating(req) {
    const { userId, productId, rate, message } = req.body;
    console.log(userId, productId, rate, message);
    if (rate < 1 || rate > 5) {
      throw ApiError.BadRequest('Рейтинг должен быть в пределах от 1 до 5');
    }
    let candidate = await RatingModel.findOne({
      userId,
      productId,
    });
    // console.log(candidate, 'Rating candidate');
    if (candidate) {
      throw ApiError.BadRequest(
        `Рейтинг продукта для этого пользователя уже существует, отредактируйте его`
      );
    }
    const product = await ProductModel.findOne({ _id: productId });
    // console.log(product, 'product');
    // console.log(Math.ceil(rate), 'rate');
    product.rating.rates += 1;
    if (product.rating.rates === 1) {
      product.rating.mediumRate = rate;
    } else {
      product.rating.mediumRate = (
        (product.rating.mediumRate * (product.rating.rates - 1) +
          Math.ceil(rate)) /
        product.rating.rates
      ).toFixed(2);
    }
    await product.save();

    const user = await UserModel.findOne({ _id: userId });

    const rating = await RatingModel.create({
      userId,
      productId,
      rate,
      message,
      name: user.name,
    });
    return { rating, userName: user.name, userRole: user.role };
  }
  async updateRating(req) {
    const { userId, productId, rate, message } = req.body;

    let candidate = await RatingModel.findOne({
      userId,
      productId,
    });

    if (!candidate) {
      throw ApiError.BadRequest(
        `Рейтинг продукта для этого пользователя не существует, создайте его`
      );
    }
    const product = await ProductModel.findOne({ _id: productId });
    const difference = rate - candidate.rate;
    // console.log(rate, message, rate, candidate.rate, difference);
    if (product.rating.rates === 1) {
      product.rating.mediumRate = rate;
    } else {
      const points = product.rating.mediumRate * product.rating.rates;
      product.rating.mediumRate = (
        (points + difference) /
        product.rating.rates
      ).toFixed(2);
    }
    await product.save();

    candidate.message = message;
    candidate.rate = rate;
    await candidate.save();
    return { success: true };
    // return { rating, userName: user.name, userRole: user.role };
  }
  async getRatings(req) {
    const { productId, page } = req.query;
    const limit = 1;
    let offset = page * limit - limit;
    const count = await RatingModel.countDocuments({ productId });
    const total = Math.ceil(count / limit);
    const ratings = await RatingModel.find({ productId })
      .skip(offset)
      .limit(limit);
    // console.log(ratings, 'Ratings');
    return { ratings, total };
  }
  async getRating(req) {
    const { productId, userId } = req.query;
    const rating = await RatingModel.findOne({ productId, userId });
    // console.log(ratings, 'Ratings');
    return { ...rating };
  }
  async isRated(userId, productId) {
    console.log(userId, productId);
    const rating = await RatingModel.findOne({ userId, productId });
    // console.log(rating, 'rating');
    return { success: rating !== null, rating };
  }
}

module.exports = new RatingService();
