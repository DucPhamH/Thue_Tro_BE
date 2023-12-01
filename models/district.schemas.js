const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    district: { type: String },
    code: { type: String },
    parent_code: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    collection: "district",
  }
);

DistrictSchema.virtual("wards", {
  ref: "ward",
  localField: "code",
  foreignField: "parent_code",
  justOne: false,
});

const districtModel = mongoose.model("district", DistrictSchema);

module.exports = districtModel;
