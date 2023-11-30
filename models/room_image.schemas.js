const mongoose = require("mongoose");

const RoomImageSchema = new mongoose.Schema(
  {
    url: { type: String },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "room_image",
  }
);

const roomImageModel = mongoose.model("room_image", RoomImageSchema);

module.exports = roomImageModel;
