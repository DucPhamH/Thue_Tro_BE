const RoomModel = require("../models/room.schemas");
const roomImageModel = require("../models/room_image.schemas");

class RoomServices {
  async createImageRoom(obj) {
    const newImageRoom = await roomImageModel.insertMany(obj);
    return newImageRoom;
  }
  async createRoom(room) {
    const newRoom = await RoomModel.create(room);
    return newRoom;
  }
}

const roomServices = new RoomServices();
module.exports = roomServices;
