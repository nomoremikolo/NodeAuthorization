const authController = require("../controllers/auth-controller");
const {
  registerValidation,
  authorizeValidation,
  updateUserValidation,
} = require("../validations/userValidation");
const authMiddleware = require("../middlewares/auth-middleware");

module.exports = class AuthRouter {
  static AddAuthorizeRouters(router) {
    router.put("/signup", registerValidation, authController.signup);
    router.post("/signin", authorizeValidation, authController.signin);
    router.get("/me", authMiddleware, authController.getSelfInfo);
    router.patch("/me", authMiddleware, authController.updateSelfInfo);
    router.post("/logout", authMiddleware, authController.signout);
    router.get("/refresh", authMiddleware, authController.refresh);
  }
};
