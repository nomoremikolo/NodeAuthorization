const authController = require("../controllers/auth-controller");
const { registerValidation, authorizeValidation } = require("../validations/userValidation");

module.exports = class AuthRouter {
  static AddAuthorizeRouters(router) {
    router.put(
      "/signup",
      registerValidation,
      authController.signup
    );
    router.post(
      "/signin",
      authorizeValidation,
      authController.signin
    );
    router.post("/logout", authController.signout);
    router.get("/refresh", authController.refresh);
  }
};
