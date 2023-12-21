const { ROOM_MESSAGE } = require("../constants/message");
const STATUS = require("../constants/status");
const RoomModel = require("../models/room.schemas");
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
    is_have_owner,
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
    is_have_owner,
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
  return res.json({ message: ROOM_MESSAGE.ROOM_CREATED, newRoom });
};

const getAllRooms = async (req, res) => {
  let {
    search,
    page,
    limit,
    address,
    type,
    sort,
    price_max,
    price_min,
    area_min,
    area_max,
    is_have_parking_lot,
    is_new,
    is_high_security,
    is_have_owner,
    is_have_bed,
    is_have_wardrobe,
    is_have_dinning_table,
    is_have_refrigerator,
    is_have_television,
    is_have_kitchen,
    is_have_washing_machine,
    number_or_people,
  } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  sort = parseInt(sort) || 1;

  let conditions = {};
  if (search) {
    conditions.$or = [
      { name: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
      { describe: { $regex: search, $options: "i" } },
      { full_field: { $regex: search, $options: "i" } },
    ];
  }
  if (address) {
    conditions.ward_id = address;
  }
  if (type) {
    conditions.type_of_room = parseInt(type);
  }
  if (price_max && price_min) {
    conditions.price = { $gte: parseInt(price_min), $lte: parseInt(price_max) };
  }
  if (area_min && area_max) {
    conditions.area = { $gte: Number(area_min), $lte: Number(area_max) };
  }
  if (is_have_parking_lot) {
    if (is_have_parking_lot === "true") {
      conditions.is_have_parking_lot = true;
    }
    if (is_have_parking_lot === "false") {
      conditions.is_have_parking_lot = false;
    }
  }
  if (is_new) {
    if (is_new === "true") {
      conditions.is_new = true;
    }
    if (is_new === "false") {
      conditions.is_new = false;
    }
  }
  if (is_high_security) {
    if (is_high_security === "true") {
      conditions.is_high_security = true;
    }
    if (is_high_security === "false") {
      conditions.is_high_security = false;
    }
  }
  if (is_have_owner) {
    if (is_have_owner === "true") {
      conditions.is_have_owner = true;
    }
    if (is_have_owner === "false") {
      conditions.is_have_owner = false;
    }
  }
  if (is_have_bed) {
    if (is_have_bed === "true") {
      conditions.is_have_bed = true;
    }
    if (is_have_bed === "false") {
      conditions.is_have_bed = false;
    }
  }
  if (is_have_wardrobe) {
    if (is_have_wardrobe === "true") {
      conditions.is_have_wardrobe = true;
    }
    if (is_have_wardrobe === "false") {
      conditions.is_have_wardrobe = false;
    }
  }
  if (is_have_dinning_table) {
    if (is_have_dinning_table === "true") {
      conditions.is_have_dinning_table = true;
    }
    if (is_have_dinning_table === "false") {
      conditions.is_have_dinning_table = false;
    }
  }
  if (is_have_refrigerator) {
    if (is_have_refrigerator === "true") {
      conditions.is_have_refrigerator = true;
    }
    if (is_have_refrigerator === "false") {
      conditions.is_have_refrigerator = false;
    }
  }
  if (is_have_television) {
    if (is_have_television === "true") {
      conditions.is_have_television = true;
    }
    if (is_have_television === "false") {
      conditions.is_have_television = false;
    }
  }
  if (is_have_kitchen) {
    if (is_have_kitchen === "true") {
      conditions.is_have_kitchen = true;
    }
    if (is_have_kitchen === "false") {
      conditions.is_have_kitchen = false;
    }
  }
  if (is_have_washing_machine) {
    if (is_have_washing_machine === "true") {
      conditions.is_have_washing_machine = true;
    }
    if (is_have_washing_machine === "false") {
      conditions.is_have_washing_machine = false;
    }
  }
  if (number_or_people) {
    if (parseInt(number_or_people) === 1) {
      conditions.number_or_people = { $lte: 1 };
    }
    if (parseInt(number_or_people) === 2) {
      conditions.number_or_people = { $lte: 2 };
    }
    if (parseInt(number_or_people) === 3) {
      conditions.number_or_people = { $lte: 3 };
    }
    if (parseInt(number_or_people) === 4) {
      conditions.number_or_people = { $lte: 4 };
    }
    if (parseInt(number_or_people) === 5) {
      conditions.number_or_people = { $lte: 5 };
    }
    if (parseInt(number_or_people) === 6) {
      conditions.number_or_people = { $gt: 5 };
    }
  }

  console.log(conditions);
  const { rooms, totalPage, total } = await roomServices.getAllRooms({
    conditions,
    page,
    limit,
    sort,
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
    total,
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
  return res.json({ message: ROOM_MESSAGE.ROOM_FOUND, room });
};

const getRoomRandom = async (req, res) => {
  const count = await RoomModel.countDocuments();
  const randomIndexes = [];
  while (randomIndexes.length < 8) {
    const randomIndex = Math.floor(Math.random() * (count - 8));
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }
  console.log(count - 8);
  console.log(randomIndexes);
  const randomRooms = await roomServices.getRoomRandom({
    randomIndexs: randomIndexes[0],
    limit: 8,
  });
  if (!randomRooms) {
    throw new ErrorWithStatus({
      message: ROOM_MESSAGE.ROOM_NOT_FOUND,
      status: STATUS.NOT_FOUND,
    });
  }
  return res.json({ message: ROOM_MESSAGE.ROOM_FOUND, randomRooms });
};

const countServices = async (req, res) => {
  const {
    count_bed,
    count_wardrobe,
    count_dining_table,
    count_refrigerator,
    count_television,
    count_kitchen,
    count_washing_machine,
  } = await roomServices.countService();
  if (
    !count_bed &&
    !count_wardrobe &&
    !count_dining_table &&
    !count_refrigerator &&
    !count_television &&
    !count_kitchen &&
    !count_washing_machine
  ) {
    throw new ErrorWithStatus({
      message: ROOM_MESSAGE.ROOM_NOT_FOUND,
      status: STATUS.NOT_FOUND,
    });
  }
  return res.json({
    message: ROOM_MESSAGE.ROOM_FOUND,
    count_bed,
    count_wardrobe,
    count_dining_table,
    count_refrigerator,
    count_television,
    count_kitchen,
    count_washing_machine,
  });
};

const countPeoples = async (req, res) => {
  const {
    one_people,
    two_people,
    three_people,
    four_people,
    five_people,
    six_people,
  } = await roomServices.countPeople();
  if (
    !one_people &&
    !two_people &&
    !three_people &&
    !four_people &&
    !five_people &&
    !six_people
  ) {
    throw new ErrorWithStatus({
      message: ROOM_MESSAGE.ROOM_NOT_FOUND,
      status: STATUS.NOT_FOUND,
    });
  }
  return res.json({
    message: ROOM_MESSAGE.ROOM_FOUND,
    one_people,
    two_people,
    three_people,
    four_people,
    five_people,
    six_people,
  });
};

const checkRooms = async (req, res) => {
  const { _id, is_checked_information } = req.body;
  const user = req.user;
  console.log(user);
  console.log(is_checked_information);
  const checkRoom = await roomServices.checkRoom({
    _id: _id,
    is_checked_information,
  });

  if (!checkRoom) {
    throw new ErrorWithStatus({
      message: ROOM_MESSAGE.ROOM_CANNOT_CHECKED,
      status: STATUS.NOT_FOUND,
    });
  }
  return res.json({ message: ROOM_MESSAGE.ROOM_IS_CHECKED, checkRoom });
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoom,
  getRoomRandom,
  countServices,
  countPeoples,
  checkRooms,
};
