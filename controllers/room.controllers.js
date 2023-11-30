const roomServices = require("../services/room.services");

const createRoom = async (req, res) => {
  try {
    const room = await roomServices.createRoom(req.body);
    res.status(200).json({ message: "Room created", room });
  } catch (err) {
    return res.status(400).json({
      message: "Error creating room",
      err,
    });
  }
};

module.exports = { createRoom };
