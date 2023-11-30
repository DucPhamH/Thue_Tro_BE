const AdminModel = require("../models/admin.schemas");

class AdminServices {
  async createAdmin(admin) {
    const newAdmin = await AdminModel.create(admin);
    return newAdmin;
  }
}

const adminServices = new AdminServices();
module.exports = adminServices;
