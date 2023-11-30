const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    user_name: { type: String, maxlength: 160, required: true },
    password: { type: String, maxlength: 160, required: true },
  },
  {
    timestamps: true,
    collection: "admin",
  }
);

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel;
