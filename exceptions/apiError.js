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
  static ActivationError() {
    return new ApiError(401, 'Активация аккаунта не была проведена');
  }
  static NotAdminError() {
    return new ApiError(403, 'Добавлять товары может только админ');
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
