const { checkSchema } = require("express-validator");
const validate = require("../utils/validation");

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
    },
    ["body"]
  )
);

module.exports = { createAdminValidator };
