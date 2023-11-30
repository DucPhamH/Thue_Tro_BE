const mongoose = require("mongoose");

const WardSchemas = new mongoose.Schema(
  {
    ward: { type: String },
    code: { type: String },
    parent_code: { type: String },
  },
  {
    timestamps: true,
    collection: "ward",
  }
);

const wardModel = mongoose.model("ward", WardSchemas);

module.exports = wardModel;
