const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    city: { type: String },
    district: { type: String },
  },
  {
    timestamps: true,
    collection: "district",
  }
);

const districtModel = mongoose.model("district", DistrictSchema);

module.exports = districtModel;
