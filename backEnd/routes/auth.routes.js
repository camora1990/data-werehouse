const { Router } = require("express");
const { check } = require("express-validator");

const { userLogin } = require("../controllers");
const { validateFields } = require("../middelwares/validate-fields");

const router = Router();
router.post(
  "/login",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .if(check("email").exists())
      .isEmail()
      .withMessage("Enter valid email!"),
    validateFields,
  ],
  userLogin
);

module.exports = router;
