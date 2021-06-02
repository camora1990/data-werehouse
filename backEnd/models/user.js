module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING(100),
      isEmail: true,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: false,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue : true,
    },
  });
};
