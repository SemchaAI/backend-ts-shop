const ProductModel = require('../models/product');
const ApiError = require('../exceptions/apiError');

class BrandService {
  async create(req) {
    const { name } = req.body;
    const candidate = await ProductModel.Brand.findOne({ name });
    if (candidate) {
      throw ApiError.BadRequest(`Бранд: ${name} - уже существует в системе`);
    }
    const brand = await ProductModel.Brand.create({ name });
    return brand;
  }
  async getAll() {
    const brands = await ProductModel.Brand.find();
    return brands;
  }
}

module.exports = new BrandService();
