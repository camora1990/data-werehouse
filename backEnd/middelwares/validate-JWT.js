const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { userEntity } = require("../database/connection.dataBase");


/**
 * Validates json web tokend jwt
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validatesJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({
      msg: "There is not token in the query",
    });
  }
  try {
    const { uid} = jwt.verify(token, process.env.PRIVATE_KEY);


    const authenticatedUser  = await userEntity.findOne({
      where: { id: uid },
    });
  
    if (!authenticatedUser) {
      return res.status(401).json({
        msg: `Invalid token - user is not register in database`,
      });
    }
    if (!authenticatedUser.status) {
      return res.status(401).json({
        msg: `Invalid token - the user ${authenticatedUser.email} is not active`,
      });
    }
    req.authenticatedUser = authenticatedUser;
    next();
  } catch (error) {
      console.log(error);
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validatesJWT,
};
