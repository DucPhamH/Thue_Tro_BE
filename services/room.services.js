const RoomModel = require("../models/room.schemas");

class RoomServices {
  async createRoom(room) {
    const newRoom = await RoomModel.create(room);
    return newRoom;
  }
}

const roomServices = new RoomServices();
module.exports = roomServices;
