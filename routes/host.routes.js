const express = require("express");
const { loginUser, logoutUser } = require("../controllers/host.controllers");
const { loginValidator } = require("../middlewares/host.middlewares");
const wrapRequestHandler = require("../utils/handlers");
const router = express.Router();

router.post("/login", loginValidator, wrapRequestHandler(loginUser));
router.post("/logout", wrapRequestHandler(logoutUser));
module.exports = router;
