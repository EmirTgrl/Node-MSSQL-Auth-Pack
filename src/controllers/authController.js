const jwt = require("jsonwebtoken");
const { User } = require("../../models/index.js");

// Generate JWT token
const signToken = (user) =>
  jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

// Helper: request body validation
const validateRegisterBody = ({ username, email, password }) => {
  const errors = [];

  if (!username) errors.push("Username cannot be empty");
  if (!email) errors.push("Email cannot be empty");
  else if (!/^\S+@\S+\.\S+$/.test(email))
    errors.push("Email format is invalid");

  if (!password) errors.push("Password cannot be empty");
  else if (password.length < 6)
    errors.push("Password must be at least 6 characters");

  return errors;
};

// Register new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const errors = validateRegisterBody({ username, email, password });

    if (errors.length)
      return res.status(400).json({ message: "Validation failed", errors });

    const user = await User.create({ username, email, password, role: "user" });
    res.status(201).json({ user: user.toJSON(), token: signToken(user) });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Login user
// identifier can be username or email
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const where = identifier.includes("@")
      ? { email: identifier }
      : { username: identifier };
    const user = await User.findOne({ where });
    if (!user) return res.status(401).json({ message: "User not found" });

    const ok = await user.validPassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid password" });

    res.json({ user: user.toJSON(), token: signToken(user) });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Get current user profile
const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({ user: user.toJSON() });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Profile not found", error: error.message });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    user.resetPasswordToken = resetToken;
    await user.save();

    res.json({ message: "Reset token generated", resetToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating reset token", error: error.message });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return res
        .status(400)
        .json({ message: "Token and new password required" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    user.resetPasswordToken = null;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .json(400)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = { register, login, me, forgotPassword, resetPassword };
