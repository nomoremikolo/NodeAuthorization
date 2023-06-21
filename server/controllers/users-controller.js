const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-errors");
const userService = require("../services/user-service");

class UsersController{
    async GetUsers(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              throw ApiError.BadRequest(errors.errors[0].msg);
            }
            const users = await userService.GetUsers(req.body) 
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UsersController()