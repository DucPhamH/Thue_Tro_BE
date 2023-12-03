const { snakeCase } = require("lodash");
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
  async getAllRooms({ conditions, page, limit }) {
    const rooms = await RoomModel.find(conditions)
      .populate("ward_id")
      .populate("district_id")
      .populate("host_id")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await RoomModel.countDocuments(conditions);
    const totalPage = Math.ceil(total / limit);
    return { rooms, totalPage };
  }
  async getRoom(id) {
    const room = await RoomModel.findById(id)
      .populate("ward_id")
      .populate("district_id")
      .populate("host_id")
      .populate("images");
    return room;
  }
}

const roomServices = new RoomServices();
module.exports = roomServices;
