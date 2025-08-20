const jwt = require("jsonwebtoken");
const { User } = require("../../models/index.js");

const signToken = (user) =>
  jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_SECRET || "1h" }
  );

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ user: user.toJSON(), token: signToken(user) });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
};

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

module.exports = { register, login, me };
