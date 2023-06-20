const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-errors");
const userService = require("../services/user-service");

class AuthController {
  async signup(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest(errors.errors[0].msg);
      }

      const userData = await userService.CreateUser(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async signin(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest(errors.errors[0].msg);
      }
      const userData = await userService.Authorize(req);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async signout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next){
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async getSelfInfo(req, res, next){
    try {
      const userId = req.user.id
      const userData = await userService.getUserInfo(userId)      

      res.json(userData)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController();
