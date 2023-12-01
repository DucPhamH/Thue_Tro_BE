const express = require("express");
const { createRoom } = require("../controllers/room.controllers");
const wrapRequestHandler = require("../utils/handlers");
const { createRoomValidator } = require("../middlewares/room.middlewares");
const router = express.Router();

router.post("/", createRoomValidator, wrapRequestHandler(createRoom));

module.exports = router;
