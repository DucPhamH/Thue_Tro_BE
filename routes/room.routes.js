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
  getRoomHost,
  updateRoom,
} = require("../controllers/room.controllers");
const {
  createRoomValidator,
  getAllRoomsValidator,
  getRoomValidator,
  checkRoomValidator,
  getRoomHostValidator,
  updateRoomValidator,
} = require("../middlewares/room.middlewares");
const {
  validateToken,
  checkRoleAdmin,
  checkRoleHost,
} = require("../middlewares/host.middlewares");

router.post("/", createRoomValidator, wrapRequestHandler(createRoom));
router.get("/", getAllRoomsValidator, wrapRequestHandler(getAllRooms));
router.get("/:id", getRoomValidator, wrapRequestHandler(getRoom));
router.get("/randomRoom/random", wrapRequestHandler(getRoomRandom));
router.get("/countServices/count", wrapRequestHandler(countServices));
router.get("/countPeoples/count", wrapRequestHandler(countPeoples));
router.get(
  "/getRoom/getRoomHost",
  wrapRequestHandler(validateToken),
  wrapRequestHandler(checkRoleHost),
  getRoomHostValidator,
  wrapRequestHandler(getRoomHost)
);
router.patch(
  "/checkRoom/check",
  wrapRequestHandler(validateToken),
  wrapRequestHandler(checkRoleAdmin),
  checkRoomValidator,
  wrapRequestHandler(checkRooms)
);
router.put(
  "/updateRoom/update",
  wrapRequestHandler(validateToken),
  wrapRequestHandler(checkRoleHost),
  updateRoomValidator,
  wrapRequestHandler(updateRoom)
);
module.exports = router;
