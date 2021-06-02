const { roleEntity, userEntity } = require("../database/connection.dataBase");

/**
 * Valid if role name exist in data base
 * @param {*} roleName
 * @author Camilo Morales Sanchez.
 */
const validateRoleName = async (roleName) => {
  const role = await roleEntity.findOne({ where: { role: roleName.toUpperCase() } });
  if (!role) {
    throw new Error(`The role ${roleName} is not valid!!`);
  }
};

/**
 * Valid if email name is already registered
 * @param {*} email
 * @author Camilo Morales Sanchez.
 */
const validateEmail = async (email) => {
  const user = await userEntity.findOne({where:{ email }});
  if (user) {
    throw new Error(`The email ${email} is already registered`);
  }
};

module.exports = {
  validateRoleName,
  validateEmail,
};
