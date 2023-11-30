const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema(
  {
    user_name: { type: String, maxlength: 160, required: true },
    password: { type: String, maxlength: 160, required: true },
    phone_number: { type: String, maxlength: 160, required: true },
    email: { type: String, maxlength: 160, required: true },
    address: { type: String, maxlength: 300, required: true },
  },
  {
    timestamps: true,
    collection: "host",
  }
);

const HostModel = mongoose.model("host", HostSchema);

module.exports = HostModel;
