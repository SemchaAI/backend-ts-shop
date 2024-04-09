const ProductModel = require('../models/product');
const ApiError = require('../exceptions/apiError');

class TypeService {
  async create(req) {
    const { name } = req.body;
    const candidate = await ProductModel.Type.findOne({ name });
    if (candidate) {
      throw ApiError.BadRequest(`Тип:${name} - уже существует в системе`);
    }
    const type = await ProductModel.Type.create({ name });
    return type;
  }
  async getAll() {
    console.log('TYPES');
    const types = await ProductModel.Type.find();
    return types;
  }
}

module.exports = new TypeService();
