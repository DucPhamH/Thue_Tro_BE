const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    district: { type: String },
    code: { type: String },
    parent_code: { type: String },
  },
  {
    timestamps: true,
    collection: "district",
  }
);

const districtModel = mongoose.model("district", DistrictSchema);

module.exports = districtModel;
