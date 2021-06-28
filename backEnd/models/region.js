module.exports = (sequelize, DataTypes) => {
  return sequelize.define("regions", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: false,
      require: true,
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
  });
};
