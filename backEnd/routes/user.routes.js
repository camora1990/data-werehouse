const { Router } = require("express");
const { check, header } = require("express-validator");
const { createUser, deleteUser } = require("../controllers");
const {
  validatesRoleName,
  validatesEmail,
  validatesIdUser,
} = require("../helpers/db-validators");
const { validatesFields, validatesJWT, isValidRole } = require("../middelwares");
const router = Router();

router.post(
  "/create-user",
  [
    header("Authorization", "Authorization is required").not().isEmpty(),
    validatesFields,
    validatesJWT,
    isValidRole,
    check("firstName", "firstName is required").not().isEmpty(),
    check("lastName", "LastName is required").not().isEmpty(),
    check("email", "Email is required")
      .not()
      .isEmpty()
      .if(check("email").exists())
      .isEmail()
      .withMessage("Enter valid email")
      .custom(validatesEmail),
    check("role").if(check("role").exists()).custom(validatesRoleName),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .if(check("password").exists())
      .isLength({ min: 7 })
      .withMessage("the pasword must be at least 7 chars long!!")
      .matches(/\d/)
      .withMessage("The pasword must contain a number!!"),

    validatesFields,
  ],
  createUser
);

router.delete(
  "/delete-user/:id",
  [
    header("Authorization", "Authorization is required").not().isEmpty(),
    validatesFields,
    validatesJWT,
    isValidRole,
    check("id")
      .isInt()
      .withMessage("The id is not integer")
      .if(check("id").isInt())
      .custom(validatesIdUser),
    validatesFields,
  ],
  deleteUser
);

module.exports = router;
