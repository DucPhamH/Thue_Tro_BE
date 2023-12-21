const { config } = require("dotenv");

config();

const envConfig = {
  port: process.env.PORT || 4000,
  mongoURL: process.env.MONGODB_URL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECERT,
};

module.exports = {
  envConfig,
};
