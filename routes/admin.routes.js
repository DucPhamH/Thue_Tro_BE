const express = require("express");
const { createAdmin } = require("../controllers/admin.controllers");
const { createAdminValidator } = require("../middlewares/admin.middlewares");
const wrapRequestHandler = require("../utils/handlers");
const router = express.Router();

router.post("/", createAdminValidator, wrapRequestHandler(createAdmin));

module.exports = router;
