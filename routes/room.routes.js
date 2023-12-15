const express = require("express");
const router = express.Router();
const wrapRequestHandler = require("../utils/handlers");
const {
  createRoom,
  getAllRooms,
  getRoom,
  getRoomRandom,
  countServices,
} = require("../controllers/room.controllers");
const {
  createRoomValidator,
  getAllRoomsValidator,
  getRoomValidator,
  countServiceValidator,
} = require("../middlewares/room.middlewares");

router.post("/", createRoomValidator, wrapRequestHandler(createRoom));
router.get("/", getAllRoomsValidator, wrapRequestHandler(getAllRooms));
router.get("/:id", getRoomValidator, wrapRequestHandler(getRoom));
router.get("/randomRoom/random", wrapRequestHandler(getRoomRandom));
router.get(
  "/countServices/count",
  countServiceValidator,
  wrapRequestHandler(countServices)
);
module.exports = router;
