
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "role",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        required: true,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
