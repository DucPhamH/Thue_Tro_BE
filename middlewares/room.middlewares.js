const { checkSchema } = require("express-validator");
const validate = require("../utils/validation");
const { TypeOfRoom } = require("../constants/enum");
const { ROOM_MESSAGE } = require("../constants/message");

const createRoomValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isLength: {
        options: { min: 3, max: 160 },
      },
      trim: true,
    },
    price: {
      notEmpty: true,
      isNumeric: true,
      trim: true,
    },
    area: {
      notEmpty: true,
      isNumeric: true,
      trim: true,
    },
    is_have_parking_lot: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_new: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_high_security: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_checked_information: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_have_bed: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_have_wardrobe: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_have_dinning_table: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_have_refrigerator: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_have_television: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_have_kitchen: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_have_washing_machine: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    is_have_owner: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    number_or_people: {
      notEmpty: true,
      isNumeric: true,
      trim: true,
    },
    address: {
      notEmpty: true,
      trim: true,
    },
    type_of_room: {
      notEmpty: true,
      isNumeric: true,
      custom: {
        options: async (value, { req }) => {
          if (
            value !== TypeOfRoom.chung_cu_mini &&
            value !== TypeOfRoom.nha_tro &&
            value !== TypeOfRoom.phong_tro
          ) {
            throw new Error(ROOM_MESSAGE.TYPE_OF_ROOM_NOT_FOUND);
          }
          return true;
        },
      },
      trim: true,
    },
    describe: {
      notEmpty: true,
      trim: true,
    },
    is_accepted: {
      notEmpty: true,
      isBoolean: true,
      trim: true,
    },
    video_url: {
      notEmpty: true,
      isLength: {
        options: { min: 3, max: 300 },
      },
      trim: true,
    },
    host_id: {
      notEmpty: true,
      trim: true,
    },
    district_id: {
      notEmpty: true,
      trim: true,
    },
    ward_id: {
      notEmpty: true,
      trim: true,
    },
  }),
  ["body"]
);

const getAllRoomsValidator = validate(
  checkSchema({
    search: {
      optional: true,
      trim: true,
    },
    type: {
      optional: true,
      isNumeric: true,
      trim: true,
    },
    sort: {
      optional: true,
      isNumeric: true,
      trim: true,
    },
    address: {
      optional: true,
      trim: true,
    },
    price_min: {
      optional: true,
      isNumeric: true,
      trim: true,
    },
    price_max: {
      optional: true,
      isNumeric: true,
      custom: {
        options: async (value, { req }) => {
          if (parseInt(value) < parseInt(req.query.price_min)) {
            throw new Error(ROOM_MESSAGE.PRICE_MAX_LESS_THAN_PRICE_MIN);
          }
          return true;
        },
      },
      trim: true,
    },
    area_min: {
      optional: true,
      isNumeric: true,
      trim: true,
    },
    area_max: {
      optional: true,
      isNumeric: true,
      custom: {
        options: async (value, { req }) => {
          if (Number(value) < Number(req.query.area_min)) {
            throw new Error(ROOM_MESSAGE.AREA_MAX_LESS_THAN_AREA_MIN);
          }
          return true;
        },
      },
      trim: true,
    },
    is_have_parking_lot: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_new: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_high_security: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_have_owner: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_have_bed: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_have_wardrobe: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_have_dinning_table: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_have_refrigerator: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_have_television: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_have_kitchen: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    is_have_washing_machine: {
      optional: true,
      isBoolean: true,
      trim: true,
    },
    number_or_people: {
      optional: true,
      isNumeric: true,
      trim: true,
    },
    page: {
      optional: true,
      trim: true,
    },
    limit: {
      optional: true,
      trim: true,
    },
  }),
  ["query"]
);

const getRoomValidator = validate(
  checkSchema({
    id: {
      notEmpty: true,
      trim: true,
      isMongoId: true,
    },
  }),
  ["params"]
);

module.exports = {
  createRoomValidator,
  getAllRoomsValidator,
  getRoomValidator,
};
