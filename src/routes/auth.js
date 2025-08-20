const router = express.Router();
const { register, login, me } = require("../controllers/authController.js");
const { auth, allowRoles } = require("../middleware/auth.js");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

// Example
router.get("/admin/ping", auth, allowRoles("admin"), (req, res) => {
  res.json({ ok: true, role: req.user.role });
});

module.exports = router;
