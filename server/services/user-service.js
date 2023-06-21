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

  async UpdateUser(data) {
    const { userId, userData } = data;
    const user = await UserModel.findById(userId);
    const fields = ["email", "phone", "permissions"];
    if (userData["password"])
      user["password"] = await bcrypt.hash(userData["password"], 3);

    fields.forEach((item) => {
      if (userData[item]) user[item] = userData[item];
    });
    await user.save();

    return new UserDto(user);
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

  async GetUserInfo(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw ApiError.BadRequest("Користувача не знайдено");
    const userDto = new UserDto(user);

    return userDto;
  }

  async GetUsers(params) {
    const { sort_by, filter, order, limit, skip, id, keywords } = params;
    if (id) return new UserDto(await UserModel.findById(id));

    let query = UserModel.find();
    if (sort_by) {
      query = query.sort({ [sort_by]: order === "desc" ? -1 : 1 });
    }

    if (filter) {
      query = query.where(filter);
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (skip) {
      query = query.skip(skip);
    }

    if (keywords) {
      query = query.find({
        $or: [
          { phone: { $regex: keywords, $options: "i" } },
          { email: { $regex: keywords, $options: "i" } },
        ],
      });
    }

    return await query.exec();
  }
}
module.exports = new UserService();
