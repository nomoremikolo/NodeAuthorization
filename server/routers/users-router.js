const usersController = require("../controllers/users-controller");
const ApiError = require("../exceptions/api-errors");
const authMiddleware = require("../middlewares/auth-middleware");
const { getUsersValidation } = require("../validations/usersValidation");
const router = require("express").Router();

router.get(
  "/users/",
  authMiddleware,
  getUsersValidation,
  usersController.GetUsers
);

module.exports = router;
