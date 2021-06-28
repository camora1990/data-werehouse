require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const {
  RoleModel,
  UserModel,
  RegionModel,
  CountryModel,
  CityModel,
} = require("../models");

class DataBase {
  constructor() {
    this.BD_NAME = process.env.BD_NAME;
    this.BD_USER = process.env.BD_USER;
    this.BD_PASSWORD = process.env.BD_PASSWORD;
    this.BD_DIALECT = process.env.BD_DIALECT;
    this.BD_PORT = process.env.BD_PORT;
    this.BD_HOST = process.env.BD_HOST;
    this.sequelize = new Sequelize(
      this.BD_NAME,
      this.BD_USER,
      this.BD_PASSWORD,
      {
        dialect: this.BD_DIALECT,
        host: this.BD_HOST,
        port: this.BD_PORT,
      }
    );
    this.createModels();
    this.relationshipDataBase();
  }

  async DBConnection() {
    try {
      await this.createEntities();
      await this.sequelize.authenticate();
      console.log("Data base connected");
    } catch (error) {
      console.log(errr);
    }
  }

  async createEntities() {
    try {
      this.sequelize.sync({ force: false });
      console.log("dataBase and entities were created successfully!!");
    } catch (error) {
      console.log(error);
    }
  }

  createModels() {
    this.roleEntity = RoleModel(this.sequelize, DataTypes);
    this.userEntity = UserModel(this.sequelize, DataTypes);
    this.regionsEntity = RegionModel(this.sequelize, DataTypes);
    this.countryEntity = CountryModel(this.sequelize, DataTypes);
    this.cityEntity = CityModel(this.sequelize, DataTypes);

    module.exports = {
      cityEntity: this.cityEntity,
      countryEntity: this.countryEntity,
      regionEntity: this.regionsEntity,
      roleEntity: this.roleEntity,
      userEntity: this.userEntity,
    };
  }

  relationshipDataBase() {
    this.regionsEntity.hasMany(this.countryEntity, {
      foreignKey: { name: "regionId" },
    });
    this.countryEntity.hasMany(this.cityEntity, {
      foreignKey: "countryId",
    });
  }
}

module.exports = DataBase;
