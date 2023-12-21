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
  async countService() {
    const count_bed = await RoomModel.find({
      is_have_bed: true,
    }).countDocuments();
    const count_wardrobe = await RoomModel.find({
      is_have_wardrobe: true,
    }).countDocuments();
    const count_dining_table = await RoomModel.find({
      is_have_dinning_table: true,
    }).countDocuments();
    const count_refrigerator = await RoomModel.find({
      is_have_refrigerator: true,
    }).countDocuments();
    const count_television = await RoomModel.find({
      is_have_television: true,
    }).countDocuments();
    const count_kitchen = await RoomModel.find({
      is_have_kitchen: true,
    }).countDocuments();
    const count_washing_machine = await RoomModel.find({
      is_have_washing_machine: true,
    }).countDocuments();
    return {
      count_bed,
      count_wardrobe,
      count_dining_table,
      count_refrigerator,
      count_television,
      count_kitchen,
      count_washing_machine,
    };
  }
  async countPeople() {
    const one_people = await RoomModel.find({
      number_or_people: { $lte: 1 },
    }).countDocuments();
    const two_people = await RoomModel.find({
      number_or_people: { $lte: 2 },
    }).countDocuments();
    const three_people = await RoomModel.find({
      number_or_people: { $lte: 3 },
    }).countDocuments();
    const four_people = await RoomModel.find({
      number_or_people: { $lte: 4 },
    }).countDocuments();
    const five_people = await RoomModel.find({
      number_or_people: { $lte: 5 },
    }).countDocuments();
    const six_people = await RoomModel.find({
      number_or_people: { $gt: 5 },
    }).countDocuments();
    return {
      one_people,
      two_people,
      three_people,
      four_people,
      five_people,
      six_people,
    };
  }
  async checkRoom({ _id, is_checked_information }) {
    const checkRoom = await RoomModel.findByIdAndUpdate(
      { _id: _id },
      { is_checked_information: is_checked_information },
      { new: true }
    );
    return checkRoom;
  }
}

const roomServices = new RoomServices();
module.exports = roomServices;
