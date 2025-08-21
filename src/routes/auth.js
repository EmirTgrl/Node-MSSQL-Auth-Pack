const express = require("express");
const router = express.Router();
const {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController.js");
const { auth, allowRoles } = require("../middleware/auth.js");
const { loginLimiter } = require("../middleware/rateLimiter.js");

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", auth, me);

// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Example
router.get("/admin/ping", auth, allowRoles("admin"), (req, res) => {
  res.json({ ok: true, role: req.user.role });
});

module.exports = router;
