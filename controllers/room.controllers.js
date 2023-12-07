const { ROOM_MESSAGE } = require("../constants/message");
const STATUS = require("../constants/status");
const roomServices = require("../services/room.services");
const { ErrorWithStatus } = require("../utils/errors");

const createRoom = async (req, res) => {
  const {
    name,
    price,
    area,
    is_have_parking_lot,
    is_new,
    is_high_security,
    is_checked_information,
    is_have_bed,
    is_have_wardrobe,
    is_have_dinning_table,
    is_have_refrigerator,
    is_have_television,
    is_have_kitchen,
    is_have_washing_machine,
    number_or_people,
    address,
    type_of_room,
    describe,
    is_accepted,
    video_url,
    host_id,
    district_id,
    ward_id,
    images,
  } = req.body;
  const newRoom = await roomServices.createRoom({
    name,
    price,
    area,
    is_have_parking_lot,
    is_new,
    is_high_security,
    is_checked_information,
    is_have_bed,
    is_have_wardrobe,
    is_have_dinning_table,
    is_have_refrigerator,
    is_have_television,
    is_have_kitchen,
    is_have_washing_machine,
    number_or_people,
    address,
    type_of_room,
    describe,
    is_accepted,
    video_url,
    host_id,
    district_id,
    ward_id,
  });
  if (!newRoom) {
    throw new ErrorWithStatus({
      message: ROOM_MESSAGE.ROOM_NOT_CREATED,
      status: STATUS.BAD_REQUEST,
    });
  }

  const imagesObj = images.map((image) => ({
    url: image,
    room_id: newRoom._id,
  }));
  const newImages = await roomServices.createImageRoom(imagesObj);
  if (!newImages) {
    throw new ErrorWithStatus({
      message: ROOM_MESSAGE.ROOM_IMAGE_NOT_CREATED,
      status: STATUS.BAD_REQUEST,
    });
  }
  res.json({ message: ROOM_MESSAGE.ROOM_CREATED, newRoom });
};

const getAllRooms = async (req, res) => {
  let { search, page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  let conditions = {};
  if (search) {
    conditions.$or = [
      { name: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
      { describe: { $regex: search, $options: "i" } },
      { full_field: { $regex: search, $options: "i" } },
    ];
  }
  console.log(conditions);
  const { rooms, totalPage } = await roomServices.getAllRooms({
    conditions,
    page,
    limit,
  });
  if (!rooms) {
    throw new ErrorWithStatus({
      message: ROOM_MESSAGE.ROOM_NOT_FOUND,
      status: STATUS.NOT_FOUND,
    });
  }
  res.json({
    message: ROOM_MESSAGE.ROOM_FOUND,
    rooms,
    totalPage,
    page,
    limit,
  });
};

const getRoom = async (req, res) => {
  const { id } = req.params;
  const room = await roomServices.getRoom(id);
  if (!room) {
    throw new ErrorWithStatus({
      message: ROOM_MESSAGE.ROOM_NOT_FOUND,
      status: STATUS.NOT_FOUND,
    });
  }
  res.json({ message: ROOM_MESSAGE.ROOM_FOUND, room });
};
module.exports = { createRoom, getAllRooms, getRoom };
