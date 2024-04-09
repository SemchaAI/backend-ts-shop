const ApiError = require('../exceptions/apiError');
const TokenService = require('../service/token');
module.exports = function (role) {
  return function (req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }
      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }
      const userData = TokenService.validateAccessToken(accessToken);
      console.log(userData);
      if (!userData.role || userData.role !== 'ADMIN') {
        return next(ApiError.NotAdminError());
      }
      req.user = userData;
      next();
    } catch (e) {
      console.log(e);
      return next(ApiError.UnauthorizedError());
    }
  };
};
