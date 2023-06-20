const Router = require("express").Router;
const router = new Router();
const usersRouter = require('./users-router')
const authRouter = require('./auth-router')

router.use(usersRouter)
router.use(authRouter)


module.exports = router;
