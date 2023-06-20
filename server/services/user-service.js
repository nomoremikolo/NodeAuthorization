const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-errors");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");

class UserService {
  async CreateUser(userData) {
    const { phone, email, password, permissions = [] } = userData;
    const passwordHash = await bcrypt.hash(password, 3);
    const user = await UserModel.create({
      email,
      phone,
      password: passwordHash,
      permissions,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async UpdateUser(){
    
  }

  async Authorize(req) {
    const candidate = req.candidate;
    const userDto = new UserDto(candidate);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async Logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async Refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUserInfo(userId){
    const user = await UserModel.findById(userId)
    if(!user)
      throw ApiError.BadRequest("Користувача не знайдено")
    const userDto = new UserDto(user)
    
    return userDto
  }
}
module.exports = new UserService();
