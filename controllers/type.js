const ApiError = require('../exceptions/apiError');
const TypeService = require('../service/type');

class TypeController {
  async create(req, res, next) {
    try {
      const type = await TypeService.create(req);
      return res.json(type);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
  async get(req, res, next) {
    try {
      const types = await TypeService.getAll();
      return res.json(types);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}
module.exports = new TypeController();
