const express = require("express");
const wrapRequestHandler = require("../utils/handlers");
const {
  getAllDistrict,
  getAllWardInDistrict,
} = require("../controllers/address.controllers");
const {
  getALLWardInDistrictValidator,
} = require("../middlewares/address.middlewares");
const router = express.Router();

router.get("/district", wrapRequestHandler(getAllDistrict));
router.get(
  "/ward/:id",
  getALLWardInDistrictValidator,
  wrapRequestHandler(getAllWardInDistrict)
);

module.exports = router;
