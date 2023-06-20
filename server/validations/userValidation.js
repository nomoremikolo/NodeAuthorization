const { body } = require("express-validator");
const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-errors");
const bcrypt = require("bcrypt");

const registerValidation = [
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
];

const authorizeValidation = [
  body(["email", "phone"]).custom(async (value, { req }) => {
    const { email, phone, password } = req.body;
    const candidate = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (!candidate)
      throw ApiError.BadRequest("Не правильні номер/пошта або пароль");

    const isPasswordEqual = await bcrypt.compare(password, candidate.password);
    if (!isPasswordEqual)
      throw ApiError.BadRequest("Не правильні номер/пошта або пароль");

    req.candidate = candidate;
  }),
];

module.exports = {registerValidation, authorizeValidation}
