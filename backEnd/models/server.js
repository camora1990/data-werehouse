require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DataBase = require("../database/connection.dataBase");

class Server {
  constructor() {
    this.PORT = process.env.PORT || 3000;
    this.app = express();

    this.paths = {
      auth: "/apiv1/auth",
      channels: "/apiv1/channel",
      cities: "/apiv1/city",
      companies: "/apiv1/company",
      contacts: "/apiv1/contact",
      countries: "/apiv1/country",
      regions: "/apiv1/region",
      roles: "/apiv1/role",
      users: "/apiv1/user",
    };
    this.connectDatabase();
    this.middelwares();
    this.routes();
  }

  middelwares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async connectDatabase() {
    this.connect = new DataBase();

    return await this.connect.DBConnection();
  }

  routes() {
    this.app.use(this.paths.users, require("../routes/user.routes"));
    this.app.use(this.paths.auth, require('../routes/auth.routes'))
  }

  startServer() {
    this.app.listen(this.PORT, () => {
      console.log(`Server started on port ${this.PORT}`);
    });
  }
}

module.exports = Server;
