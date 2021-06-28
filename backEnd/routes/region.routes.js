const { Router } = require("express");
const { check } = require("express-validator");
const { createRegion } = require("../controllers");
const { validatesRegionName, validatesCountryName } = require("../helpers/db-validators");
const { validatesFields } = require("../middelwares");

const router = Router();

router.post(
  "/create-regions",
  [
    check("region")
      .not()
      .isEmpty()
      .withMessage("region name is required")
      .if(check("region").exists())
      .custom(validatesRegionName),
    check("country")
      .not()
      .isEmpty()
      .withMessage("country name is required")
      .if(check("country").exists()).custom(validatesCountryName),
    check("cities").not().isEmpty().withMessage("cities are required"),
    validatesFields,
  ],
  createRegion
);

module.exports = router;
