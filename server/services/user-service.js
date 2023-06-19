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
}
module.exports = new UserService();
