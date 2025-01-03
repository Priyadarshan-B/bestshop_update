const express = require("express");
const signup = require("../../controllers/auth/signup");
const login = require("../../controllers/auth/login");
const logout = require("../../controllers/auth/logout");
const authenticate_token = require("../../middleware/authenticate_token");
const users = require("../../controllers/auth/login")

const router = express.Router();
router.post("/login", login.post_login)
router.get("/masterUsers", users.get_users)
router.post("/signup", signup.post_signup)
// router.use(authenticate_token)
router.post("/logout", logout.post_logout)

module.exports = router;
