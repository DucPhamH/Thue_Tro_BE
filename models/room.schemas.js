const mongoose = require("mongoose");
const districtModel = require("./district.schemas");
const wardModel = require("./ward.schemas");
const hostModel = require("./host.schemas");

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
    is_have_owner: { type: Boolean, required: true },
    number_or_people: { type: Number, required: true },
    address: { type: String, maxlength: 300, required: true },
    type_of_room: { type: Number, required: true },
    describe: { type: String, required: true },
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
    ward_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ward",
      required: true,
    },
    full_field: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    collection: "room",
  }
);

RoomSchema.virtual("images", {
  ref: "room_image",
  localField: "_id",
  foreignField: "room_id",
  justOne: false,
});

RoomSchema.pre("save", async function (next) {
  try {
    const district = await districtModel.findById(this.district_id);
    const ward = await wardModel.findById(this.ward_id);
    const host = await hostModel.findById(this.host_id);
    this.full_field = `${this.name}, ${this.price}, ${this.area}, ${this.number_or_people} người ,${this.address}, ${ward.ward}, ${district.district}, ${this.describe}, ${host.user_name}, ${host.phone_number}, ${host.email}`;

    if (this.is_have_parking_lot) {
      this.full_field += ", có chỗ để xe";
    }
    if (this.is_new) {
      this.full_field += ", mới xây";
    }
    if (this.is_high_security) {
      this.full_field += ", an ninh cao";
    }
    if (this.is_checked_information) {
      this.full_field += ", đã kiểm tra thông tin";
    }
    if (this.is_have_bed) {
      this.full_field += ", có giường";
    }
    if (this.is_have_wardrobe) {
      this.full_field += ", có tủ quần áo";
    }
    if (this.is_have_dinning_table) {
      this.full_field += ", có bàn ăn";
    }
    if (this.is_have_refrigerator) {
      this.full_field += ", có tủ lạnh";
    }
    if (this.is_have_television) {
      this.full_field += ", có tivi";
    }
    if (this.is_have_kitchen) {
      this.full_field += ", có bếp";
    }
    if (this.is_have_washing_machine) {
      this.full_field += ", có máy giặt";
    }
    if (this.type_of_room === 0) {
      this.full_field += ", phòng trọ";
    }
    if (this.type_of_room === 1) {
      this.full_field += ", nhà trọ";
    }
    if (this.type_of_room === 2) {
      this.full_field += ", chung cư mini";
    }
    if (this.is_accepted) {
      this.full_field += ", đã được duyệt";
    }
    if (this.is_have_owner) {
      this.full_field += ", có chung chủ";
    }
    next();
  } catch (err) {
    next(err);
  }
});

const RoomModel = mongoose.model("room", RoomSchema);

module.exports = RoomModel;
