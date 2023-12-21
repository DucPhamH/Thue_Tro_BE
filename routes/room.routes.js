const express = require("express");
const router = express.Router();
const wrapRequestHandler = require("../utils/handlers");
const {
  createRoom,
  getAllRooms,
  getRoom,
  getRoomRandom,
  countServices,
  countPeoples,
  checkRooms,
} = require("../controllers/room.controllers");
const {
  createRoomValidator,
  getAllRoomsValidator,
  getRoomValidator,
  checkRoomValidator,
} = require("../middlewares/room.middlewares");
const { validateToken } = require("../middlewares/host.middlewares");

router.post("/", createRoomValidator, wrapRequestHandler(createRoom));
router.get("/", getAllRoomsValidator, wrapRequestHandler(getAllRooms));
router.get("/:id", getRoomValidator, wrapRequestHandler(getRoom));
router.get("/randomRoom/random", wrapRequestHandler(getRoomRandom));
router.get("/countServices/count", wrapRequestHandler(countServices));
router.get("/countPeoples/count", wrapRequestHandler(countPeoples));
router.patch(
  "/checkRoom/check",
  checkRoomValidator,
  wrapRequestHandler(checkRooms)
);
module.exports = router;
