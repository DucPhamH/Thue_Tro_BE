const { ADDRESS_MESSAGE } = require("../constants/message");
const STATUS = require("../constants/status");
const addressServices = require("../services/address.services");
const { ErrorWithStatus } = require("../utils/errors");

const getAllDistrict = async (req, res) => {
  const districts = await addressServices.getAllDistrict();
  if (!districts) {
    throw new ErrorWithStatus({
      message: ADDRESS_MESSAGE.DISTRICT_NOT_FOUND,
      status: STATUS.BAD_REQUEST,
    });
  }
  return res.json({
    message: ADDRESS_MESSAGE.GET_DISTRICT_SUCCESS,
    districts: districts,
  });
};
const getAllWardInDistrict = async (req, res) => {
  const { id } = req.params;
  const wards = await addressServices.getAllWardInDistrict({ id });
  if (!wards) {
    throw new ErrorWithStatus({
      message: ADDRESS_MESSAGE.WARD_NOT_FOUND,
      status: STATUS.BAD_REQUEST,
    });
  }
  return res.json({
    message: ADDRESS_MESSAGE.GET_WARD_IN_DISTRICT_SUCCESS,
    wards: wards,
  });
};

module.exports = { getAllDistrict, getAllWardInDistrict };
