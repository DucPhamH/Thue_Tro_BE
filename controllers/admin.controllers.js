const adminServices = require("../services/admin.services");

const createAdmin = async (req, res) => {
  const { user_name, password } = req.body;
  const admin = await adminServices.createAdmin({ user_name, password });
  res.status(200).json({ message: "Admin created", admin });
};

module.exports = { createAdmin };
