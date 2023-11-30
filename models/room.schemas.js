const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 160, required: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    is_have_parking_lot: { type: Boolean, required: true },
    is_new: { type: Boolean, required: true },
    is_high_security: { type: Boolean, required: true },
    is_checked_information: { type: Boolean, required: true },
    is_have_bed: { type: Boolean, required: true },
    is_have_wardrobe: { type: Boolean, required: true },
    is_have_dinning_table: { type: Boolean, required: true },
    is_have_refrigerator: { type: Boolean, required: true },
    is_have_television: { type: Boolean, required: true },
    is_have_kitchen: { type: Boolean, required: true },
    is_have_washing_machine: { type: Boolean, required: true },
    number_or_people: { type: Number, required: true },
    address: { type: String, maxlength: 300, required: true },
    type_of_room: { type: Number, required: true },
    describe: { type: String, maxlength: 300, required: true },
    is_accepted: { type: Boolean, required: true },
    video_url: { type: String, required: true },
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "host",
      required: true,
    },
    district_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "district",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "room",
  }
);

const RoomModel = mongoose.model("room", RoomSchema);

module.exports = RoomModel;
