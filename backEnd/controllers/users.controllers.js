const bcrypjs = require("bcryptjs");
const { request, response } = require("express");
const { userEntity } = require("../database/connection.dataBase");


const createUser = async (req = request, res = response) => {
  const salt = bcrypjs.genSaltSync(10);
  req.body.password = bcrypjs.hashSync(req.body.password, salt);
  const { firstName, lastName, email, password, role = "USER_ROLE" } = req.body;

  const user = await userEntity.create(
    {
      firstName,
      lastName,
      email,
      password,
      role: role.toUpperCase(),
    }
    
  );
  delete user.dataValues['password']
  res.json({
    user,
  });
};

module.exports = {
  createUser,
};
