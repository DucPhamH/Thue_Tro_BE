const mongoose = require("mongoose");

const WardSchemas = new mongoose.Schema(
  {
    ward: { type: String },
    district_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "district",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "ward",
  }
);

const wardModel = mongoose.model("ward", WardSchemas);

module.exports = wardModel;
