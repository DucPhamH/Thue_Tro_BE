const MESSAGE = {
  VALIDATION_ERROR: "Validation error",
};

const ROOM_MESSAGE = {
  ROOM_CREATED: "Room created",
  ROOM_UPDATED: "Room updated",
  ROOM_DELETED: "Room deleted",
  ROOM_NOT_FOUND: "Room not found",
  ROOM_FOUND: "Room found",
  ROOM_NOT_CREATED: "Room not created",
  ROOM_IMAGE_NOT_FOUND: "Room image not found",
  ROOM_IMAGE_CREATED: "Room image created",
  ROOM_IMAGE_DELETED: "Room image deleted",
  ROOM_IMAGE_UPDATED: "Room image updated",
  ROOM_IMAGE_NOT_CREATED: "Room image not created",
  TYPE_OF_ROOM_NOT_FOUND: "Type of room must be 0 or 1 or 2",
  PRICE_MAX_LESS_THAN_PRICE_MIN: "Price max must be greater than price min",
  AREA_MAX_LESS_THAN_AREA_MIN: "Area max must be greater than area min",
  ROOM_CANNOT_CHECKED: "Room cannot checked",
  ROOM_IS_CHECKED: "Room is checked",
};

const USER_MESSAGE = {
  USER_NAME_IS_EXIST: "User name is exist",
  USER_NAME_IS_NOT_EXIST: "User name is not exist",
  LOGIN_SUCCESS: "Login success",
  YOU_NEED_TO_LOGIN: "You need to login",
  TOKEN_IS_NOT_VALID: "Token is not valid",
  LOGOUT_SUCCESS: "Logout success",
};

const ADDRESS_MESSAGE = {
  DISTRICT_NOT_FOUND: "District not found",
  GET_ALL_DISTRICT_SUCCESS: "Get all district success",
  WARD_NOT_FOUND: "Ward not found",
  GET_WARD_IN_DISTRICT_SUCCESS: "Get ward in district success",
};

module.exports = { MESSAGE, ROOM_MESSAGE, ADDRESS_MESSAGE, USER_MESSAGE };
