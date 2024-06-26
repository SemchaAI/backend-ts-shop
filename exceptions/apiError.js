module.exports = class ApiError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }
  static NotAdminError() {
    return new ApiError(401, 'Добавлять товары может только админ');
  }
  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
