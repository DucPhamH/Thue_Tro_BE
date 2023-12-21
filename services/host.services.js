const { envConfig } = require("../constants/config");
const jwt = require("jsonwebtoken");
class HostServices {
  async login(user) {
    console.log(envConfig.accessTokenSecret);
    const accessToken = await jwt.sign(
      {
        _id: user._id,
        user_name: user.user_name,
        password: user.password,
        phone_number: user.phone_number,
        email: user.email,
        roles: user.roles,
      },
      envConfig.accessTokenSecret,
      { expiresIn: "30d" }
    );

    const data = {
      accessToken: "Bearer " + accessToken,
      user,
    };
    return data;
  }
}

const hostServices = new HostServices();
module.exports = hostServices;
