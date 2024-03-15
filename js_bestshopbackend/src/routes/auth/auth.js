const express = require("express");
const signup = require("../../controllers/auth/signup");
const login = require("../../controllers/auth/login");
const logout = require("../../controllers/auth/logout");
const authenticate_token = require("../../middleware/authenticate_token");

const router = express.Router();
router.post("/login", login.post_login)
router.use(authenticate_token)
router.post("/signup", signup.post_signup)
router.post("/logout", logout.post_logout)
module.exports = router;
