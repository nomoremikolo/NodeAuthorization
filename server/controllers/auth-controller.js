const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-errors");
const userService = require("../services/user-service");

class AuthController {
  async signup(req, res, next) {
    try {
      const errors = validationResult(req).errors;
      if (errors.length > 0) {
        throw new ApiError(400, errors[0].msg)
      }

      const userData = await userService.CreateUser(req.body);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
