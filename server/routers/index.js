const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth-controller");
const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-errors");

router.put(
  "/signup",
  body("email")
    .isEmail()
    .withMessage("Ви ввели не коректну електронну адресу")
    .custom(async (value, { req }) => {
      const { email } = req.body;
      const candidate = await UserModel.findOne({ email });
      if (candidate)
        throw new ApiError(
          500,
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
        throw new ApiError(
          500,
          "Користувача з такими номером телефону вже створено"
        );
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Пароль має містити принаймні 8 символів")
    .custom(async (value, { req }) => {
      if (value !== req.body.passwordConfirmation)
        throw new ApiError(500, "Паролі не сходяться..");
    }),
  body("passwordConfirmation")
    .isLength({ min: 8 })
    .withMessage("Пароль має містити принаймні 8 символів"),
  authController.signup
);

module.exports = router;
