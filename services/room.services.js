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
  async getAllRooms({ conditions, page, limit, sort }) {
    const rooms = await RoomModel.find(conditions)
      .populate("ward_id")
      .populate("district_id")
      .populate("host_id")
      .populate("images")
      .sort({ price: sort })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await RoomModel.countDocuments(conditions);
    const totalPage = Math.ceil(total / limit);
    return { rooms, totalPage, total };
  }
  async getRoom(id) {
    const room = await RoomModel.findById(id)
      .populate("ward_id")
      .populate("district_id")
      .populate("host_id")
      .populate("images");
    return room;
  }
  async getRoomRandom({ randomIndexs, limit }) {
    const randomRooms = await RoomModel.find({})
      .populate("images")
      .skip(randomIndexs)
      .limit(limit);
    return randomRooms;
  }
  async countService(key) {
    console.log(key);
    const obj = { [key]: true };
    console.log(obj);
    const count = await RoomModel.find(obj).countDocuments();
    return count;
  }
  async countPeople(conditionsPeople) {
    const count = await RoomModel.find(conditionsPeople).countDocuments();
    return count;
  }
}

const roomServices = new RoomServices();
module.exports = roomServices;
