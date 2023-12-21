const { USER_MESSAGE } = require("../constants/message");
const hostServices = require("../services/host.services");

const loginUser = async (req, res) => {
  const user = req.user;
  console.log(user);
  const data = await hostServices.login(user);
  res.json({
    message: USER_MESSAGE.LOGIN_SUCCESS,
    data,
  });
};

module.exports = {
  loginUser,
};
