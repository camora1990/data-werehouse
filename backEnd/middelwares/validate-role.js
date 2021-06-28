const { request, response } = require("express");


/**
 * Validates user role
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const isValidRole = (req = request, res = response, next) => {
  const { role, email } = req.authenticatedUser;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `The user ${email} does not have permissions `,
    });
  }
  next();
};

module.exports = {
  isValidRole,
};
