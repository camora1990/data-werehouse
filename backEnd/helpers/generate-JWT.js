const jwt = require("jsonwebtoken");


/**
 * Generate Jeison Web Token 
 * @param {*} uid  
 * @returns the authentication Token 
 * @author Camilo Morales Sanchez
 */
const generateToken = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("The token could not be generate");
        } else {
          resolve(token);
        }
      }
    );
  });
};


module.exports = {
    generateToken
}