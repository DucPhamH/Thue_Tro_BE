const { checkSchema } = require("express-validator");
const validate = require("../utils/validation");
const { ErrorWithStatus } = require("../utils/errors");

const createAdminValidator = validate(
  checkSchema(
    {
      user_name: {
        notEmpty: true,
        isLength: {
          options: { min: 3, max: 160 },
        },
        trim: true,
      },
      password: {
        notEmpty: true,
        isLength: {
          options: { min: 6, max: 160 },
        },
        trim: true,
      },
      email: {
        notEmpty: true,
        isEmail: true,
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (req.body.password === "1234") {
              throw new ErrorWithStatus({
                message: "Password cannot be 1234",
                status: 400,
              });
            }
            return true;
          },
        },
      },
    },
    ["body"]
  )
);

module.exports = { createAdminValidator };
