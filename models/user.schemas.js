const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: { type: String, maxlength: 160, required: true },
    password: { type: String, maxlength: 160, required: true },
    phone_number: { type: String, maxlength: 160, required: true },
    email: { type: String, maxlength: 160, required: true },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
