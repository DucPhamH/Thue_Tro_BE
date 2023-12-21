const { checkSchema } = require("express-validator");
const validate = require("../utils/validation");
const hostModel = require("../models/host.schemas");
const { USER_MESSAGE } = require("../constants/message");
const jwt = require("jsonwebtoken");
const { ErrorWithStatus } = require("../utils/errors");
const STATUS = require("../constants/status");
const { envConfig } = require("../constants/config");

const loginValidator = validate(
  checkSchema({
    user_name: {
      notEmpty: true,
      isLength: {
        options: { min: 3, max: 160 },
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const user = await hostModel.findOne({
            user_name: value,
            password: req.body.password,
          });
          if (!user) {
            throw new Error(USER_MESSAGE.USER_NAME_IS_NOT_EXIST);
          }
          req.user = user;
          return true;
        },
      },
    },
    password: {
      notEmpty: true,
      isLength: {
        options: { min: 3, max: 160 },
      },
      trim: true,
    },
  }),
  ["body"]
);

const validateToken = async (req, res, next) => {
  let token;
  let authHeader =
    req.headers.Authorization || req.headers.authorization || null;
  console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, envConfig.accessTokenSecret, (err, decoded) => {
      if (err) {
        throw new ErrorWithStatus({
          message: USER_MESSAGE.TOKEN_IS_NOT_VALID,
          status: STATUS.UNAUTHORIZED,
        });
      }
      req.user = decoded;
      next();
    });

    if (!token || authHeader === null) {
      throw new ErrorWithStatus({
        message: USER_MESSAGE.YOU_NEED_TO_LOGIN,
        status: STATUS.UNAUTHORIZED,
      });
    }
  } else {
    throw new ErrorWithStatus({
      message: USER_MESSAGE.YOU_NEED_TO_LOGIN,
      status: STATUS.UNAUTHORIZED,
    });
  }
};

module.exports = {
  loginValidator,
  validateToken,
};
