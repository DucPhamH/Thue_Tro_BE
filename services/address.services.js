const districtModel = require("../models/district.schemas");
const wardModel = require("../models/ward.schemas");

class AddressServices {
  async getAllDistrict() {
    const districts = await districtModel.find();
    return districts;
  }
  async getAllWardInDistrict({ id }) {
    const wards = await wardModel.find({ parent_code: id });
    return wards;
  }
}

const addressServices = new AddressServices();
module.exports = addressServices;
