const { ROOM_MESSAGE } = require("../constants/message");
const roomServices = require("../services/room.services");

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
  console.log(newImages);
  if (!newImages) {
    throw new ErrorWithStatus({
      message: ROOM_MESSAGE.ROOM_IMAGE_NOT_CREATED,
      status: STATUS.BAD_REQUEST,
    });
  }
  res.json({ message: ROOM_MESSAGE.ROOM_CREATED, newRoom });
};

module.exports = { createRoom };
