const { body } = require("express-validator");
const authController = require("../controllers/auth-controller");
const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-errors");
const bcrypt = require("bcrypt");

module.exports = class AuthRouter {
  static AddAuthorizeRouters(router) {
    router.put(
      "/signup",
      body("email")
        .isEmail()
        .withMessage("Ви ввели не коректну електронну адресу")
        .custom(async (value, { req }) => {
          const { email } = req.body;
          const candidate = await UserModel.findOne({ email });
          if (candidate)
            throw ApiError.BadRequest(
              "Користувача з такою електронною адресою вже створено"
            );
        }),
      body("phone")
        .isMobilePhone()
        .withMessage("Ви ввели не коректний номер телефону")
        .custom(async (value, { req }) => {
          const { phone } = req.body;
          const candidate = await UserModel.findOne({ phone });
          if (candidate)
            throw ApiError.BadRequest(
              "Користувача з такими номером телефону вже створено"
            );
        }),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Пароль має містити принаймні 8 символів")
        .custom(async (value, { req }) => {
          if (value !== req.body.passwordConfirmation)
            throw ApiError.BadRequest("Паролі не сходяться..");
        }),
      body("passwordConfirmation")
        .isLength({ min: 8 })
        .withMessage("Пароль має містити принаймні 8 символів"),
      authController.signup
    );

    router.post(
      "/signin",
      body(["email", "phone"]).custom(async (value, { req }) => {
        const { email, phone, password } = req.body;
        const candidate = await UserModel.findOne({
          $or: [{ email }, { phone }],
        });
        if (!candidate)
          throw ApiError.BadRequest("Не правильні номер/пошта або пароль");

        const isPasswordEqual = await bcrypt.compare(
          password,
          candidate.password
        );
        if (!isPasswordEqual)
          throw ApiError.BadRequest("Не правильні номер/пошта або пароль");

        req.candidate = candidate;
      }),
      authController.signin
    );

    router.post("/logout", authController.signout);
    router.get("/refresh", authController.refresh);
  }
};
