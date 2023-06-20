const authController = require("../controllers/auth-controller");
const {
  registerValidation,
  authorizeValidation,
  updateUserValidation,
} = require("../validations/authValidation");
const authMiddleware = require("../middlewares/auth-middleware");
const router = require("express").Router();

router.put("/signup", registerValidation, authController.signup);
router.post("/signin", authorizeValidation, authController.signin);
router.get("/me", authMiddleware, authController.getSelfInfo);
router.patch("/me", authMiddleware, authController.updateSelfInfo);
router.post("/logout", authMiddleware, authController.signout);
router.get("/refresh", authMiddleware, authController.refresh);

module.exports = router;
