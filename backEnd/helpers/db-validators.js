const {
  roleEntity,
  userEntity,
  regionEntity,
  countryEntity,
} = require("../database/connection.dataBase");
const { capitalLetter } = require("./capital-letter");

/**
 * Valid if role name exist in data base
 * @param {*} roleName
 * @author Camilo Morales Sanchez.
 */
const validatesRoleName = async (roleName) => {
  const role = await roleEntity.findOne({
    where: { role: roleName.toUpperCase() },
  });
  if (!role) {
    throw new Error(`The role ${roleName} is not valid!!`);
  }
};

/**
 * Valid if email name is already registered
 * @param {*} email
 * @author Camilo Morales Sanchez.
 */
const validatesEmail = async (email) => {
  const user = await userEntity.findOne({ where: { email } });
  if (user) {
    throw new Error(`The email ${email} is already registered`);
  }
};

/**
 * Validates if user is in data base
 * @param {*} uid
 */
const validatesIdUser = async (uid) => {
  const user = await userEntity.findByPk(uid);
  if (!user) {
    throw new Error(`The user with id[${uid}] is not in database`);
  }
};

/**
 * Validates if region is in data base
 * @param {*} name
 */
const validatesRegionName = async (name) => {
  const nameCapitalLetter = capitalLetter(name);
  const region = await regionEntity.findOne({
    where: { region: nameCapitalLetter },
  });
  if (region) throw new Error(`The region ${name} is registered in data base`);
};

/**
 * Validates if country is in data base
 * @param {*} name
 */
const validatesCountryName = async (name) => {
  const nameCapitalLetter = capitalLetter(name);
  const country = await countryEntity.findOne({
    where: { country: nameCapitalLetter },
  });
  if (country)
    throw new Error(`The country ${name} is registered in data base`);
};

module.exports = {
  validatesCountryName,
  validatesEmail,
  validatesIdUser,
  validatesRegionName,
  validatesRoleName,
};
