const express = require("express");
const authRoutes = express.Router();
const {
    register,
    login
  } = require("../controllers/authController");
const {
  sendResetCode,
   verifyResetCode,
    resetPassword
  } = require("../controllers/forgotPasswordController");

authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.post('/forgot-password', sendResetCode);
authRoutes.post('/verify-code', verifyResetCode);
authRoutes.post('/reset-password', resetPassword);

module.exports = authRoutes;



