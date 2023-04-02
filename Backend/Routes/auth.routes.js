const { Router } = require("express");
const router = Router();

const { login, register } = require("../Controllers/auth.controllers");

router.post("/login", login);
router.post("/register", register);

module.exports = router;