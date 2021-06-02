const { Router, response, request } = require("express");
const { check } = require("express-validator");
const { createUser } = require("../controllers");
const { validateRoleName, validateEmail } = require("../helpers/db-validators");
const { validateFields } = require("../middelwares/validate-fields");
const router = Router();

router.post(
  "/create-user",
  [
    check("firstName", "firstName is required").not().isEmpty(),
    check("lastName", "LastName is required").not().isEmpty(),
    check("email", "Email is required")
      .not()
      .isEmpty()
      .if(check("email").exists())
      .isEmail()
      .withMessage("Enter valid email")
      .custom(validateEmail),
    check("role").if(check("role").exists()).custom(validateRoleName),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .if(check("password").exists())
      .isLength({ min: 7 })
      .withMessage("the pasword must be at least 7 chars long!!")
      .matches(/\d/)
      .withMessage("The pasword must contain a number!!"),

    validateFields,
  ],
  createUser
);

module.exports = router;
