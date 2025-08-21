const express = require("express");
const router = express.Router();
const {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
} = require("../controllers/authController.js");
const { auth, allowRoles } = require("../middleware/auth.js");
const { loginLimiter } = require("../middleware/rateLimiter.js");

// Auth routes
router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", auth, me);

// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Refresh token
router.post("/refresh", refreshAccessToken);

// Logout
router.post("/logout", auth, logout);

// Example
router.get("/admin/ping", auth, allowRoles("admin"), (req, res) => {
  res.json({ ok: true, role: req.user.role });
});

module.exports = router;
