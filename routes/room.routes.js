const express = require("express");
const router = express.Router();
const wrapRequestHandler = require("../utils/handlers");
const {
  createRoom,
  getAllRooms,
  getRoom,
  getRoomRandom,
} = require("../controllers/room.controllers");
const {
  createRoomValidator,
  getAllRoomsValidator,
  getRoomValidator,
} = require("../middlewares/room.middlewares");

router.post("/", createRoomValidator, wrapRequestHandler(createRoom));
router.get("/", getAllRoomsValidator, wrapRequestHandler(getAllRooms));
router.get("/:id", getRoomValidator, wrapRequestHandler(getRoom));
router.get("/randomRoom/random", wrapRequestHandler(getRoomRandom));
module.exports = router;
