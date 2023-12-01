const express = require("express");
const wrapRequestHandler = require("../utils/handlers");
const { getAddress } = require("../controllers/address.controllers");
const router = express.Router();

router.get("/", wrapRequestHandler(getAddress));

module.exports = router;
