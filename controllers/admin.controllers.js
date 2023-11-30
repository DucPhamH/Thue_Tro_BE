const adminServices = require("../services/admin.services");

const createAdmin = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const admin = await adminServices.createAdmin({ user_name, password });
    res.status(200).json({ message: "Admin created", admin });
  } catch (err) {
    return res.status(400).json({
      message: "Error creating admin",
      err,
    });
  }
};

module.exports = { createAdmin };
