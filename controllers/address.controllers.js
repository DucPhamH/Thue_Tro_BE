const districtModel = require("../models/district.schemas");
const wardModel = require("../models/ward.schemas");

const getAddress = async (req, res) => {
  const address = await districtModel.aggregate([
    {
      $match: {
        code: "001",
      },
    },
    {
      $lookup: {
        from: "ward",
        localField: "code",
        foreignField: "parent_code",
        as: "wards",
      },
    },
  ]);
  //   const ward = await wardModel.find({ parent_code: "00001" });

  //   const address = await districtModel.find({ code: "001" }).populate("wards");
  // .populate({ path: "wards", model: "ward", match: { code: "001" } });
  res.status(200).json({ message: "Get address successfully", address });
};

module.exports = { getAddress };
