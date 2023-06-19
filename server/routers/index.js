const Router = require("express").Router;
const router = new Router();
const AuthRouter = require("./auth-router")

AuthRouter.AddAuthorizeRouters(router)

module.exports = router;
