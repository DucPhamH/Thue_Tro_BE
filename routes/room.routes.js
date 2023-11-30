const express = require("express");
const { createRoom } = require("../controllers/room.controllers");
const router = express.Router();

router.post("/", createRoom);

module.exports = router;
