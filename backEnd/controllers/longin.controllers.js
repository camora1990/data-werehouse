const { request, response } = require("express");
const { userEntity } = require("../database/connection.dataBase");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../helpers/generate-JWT");

const userLogin = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await userEntity.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        msg: `The email ${email} is not register in database`,
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: `The user ${email} is not active`,
      });
    }

    const verifyPassword = bcryptjs.compareSync(password, user.password);
    if (!verifyPassword) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }

    const token = await generateToken(user.id);
    res.json({
      token,
    });

  } catch (error) {

    console.log(error);
    
    return res.status(500).json({
      msg: "Contact the database administrator",
    });
  }
};

module.exports = {
  userLogin,
};
