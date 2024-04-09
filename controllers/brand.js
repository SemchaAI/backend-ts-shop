const ApiError = require('../exceptions/apiError');
const BrandService = require('../service/brand');

class BrandController {
  async create(req, res, next) {
    try {
      const type = await BrandService.create(req);
      return res.json(type);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async get(req, res, next) {
    try {
      const types = await BrandService.getAll();
      return res.json(types);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
module.exports = new BrandController();
