const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail');
const TokenService = require('./token');
const CartService = require('./cart');
const FavoriteService = require('./favorite');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/apiError');

class UserService {
  async registration(email, password, name) {
    console.log(email, name, password, 'DATA');
    let candidate = await UserModel.findOne({
      $or: [{ email }, { name }],
    });
    console.log(candidate, 'CANDIDATE');
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с таким email/name: уже существует`
      );
      //${email}/${name}
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      name,
      password: hashPassword,
      role: 'USER',
      activationLink,
    });
    await CartService.create(user._id);
    await FavoriteService.create(user._id);
    await MailService.sendActivationMail(
      email,
      //activationLink
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );
    const userDto = new UserDto(user); // id, email,name, isActivated
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    console.log(email, password, 'LOGIN-ROUTE');
    const user = await UserModel.findOne({
      $or: [{ email }, { name: email }],
    });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email/name не найден');
    }
    if (!user.isActivated) {
      throw ApiError.BadRequest('Пользователь не активирован. Проверьте почту');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    console.log('LOGOUT-ROUTE');
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    console.log('REFRESH-ROUTE');
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async getUser(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const accessToken = TokenService.generateAccessToken({ ...userDto });

    return { accessToken, user: userDto };
  }
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
