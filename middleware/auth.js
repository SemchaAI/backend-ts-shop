const ApiError = require('../exceptions/apiError');
const TokenService = require('../service/token');
module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      // console.log('no auth header');
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      // console.log('no access token');
      return next(ApiError.UnauthorizedError());
    }
    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      // console.log('no user data');
      return next(ApiError.UnauthorizedError());
    }
    if (!userData.isActivated) {
      // console.log('not activated');
      return next(ApiError.ActivationError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
