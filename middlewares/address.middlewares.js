const { checkSchema } = require("express-validator");
const validate = require("../utils/validation");

const getALLWardInDistrictValidator = validate(
  checkSchema({
    id: {
      notEmpty: true,
      isString: true,
      trim: true,
    },
  }),
  ["params"]
);

module.exports = { getALLWardInDistrictValidator };
