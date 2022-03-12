const { Router } = require("express");
const jwt = require("jsonwebtoken");
const user_controller = require("../controllers/user.controller");
const auth_middleware = require("../middleware/auth.middleware");

const auth = Router();

auth.post("/register", user_controller.Register);
auth.post("/login", user_controller.Login);
auth.post(
  "/token",
  auth_middleware.verifyRefreshToken,
  user_controller.GetAccessToken
);
auth.get("/me", auth_middleware.verifyToken, user_controller.Test);
auth.get("/logout", auth_middleware.verifyToken, user_controller.Logout);

module.exports = auth;
