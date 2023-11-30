const express = require("express");
const { validationResult } = require("express-validator");
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
const validate = (validation) => {
  return async (req, res, next) => {
    await validation.run(req);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    // console.log(errors.mapped());
    res.status(400).json({ errors: errors.mapped() });
  };
};

module.exports = validate;
