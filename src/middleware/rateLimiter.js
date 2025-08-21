const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    message: "Too many login attempts, please try again later.",
  },
  standartHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter };
