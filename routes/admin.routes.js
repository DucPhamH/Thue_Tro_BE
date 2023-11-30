const express = require("express");
const { createAdmin } = require("../controllers/admin.controllers");
const { createAdminValidator } = require("../middlewares/admin.middlewares");
const router = express.Router();

router.post("/", createAdminValidator, createAdmin);

module.exports = router;
