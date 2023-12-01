const { omit } = require("lodash");
const STATUS = require("../constants/status");

const defaultErrorHander = (err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || STATUS.INTERNAL_SERVER_ERROR)
    .json(omit(err, ["status"]));
};

module.exports = defaultErrorHander;
