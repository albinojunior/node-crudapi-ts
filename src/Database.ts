import { ISequelizeConfig, Sequelize } from "sequelize-typescript";

const config = require("./config/database");
const env = process.env.NODE_ENV || 'development';

export default class Database {
  config: ISequelizeConfig = config[env];
  connection: Sequelize;

  constructor() {
    this.connect();
  }

  connect = (): void => {
    this.connection = new Sequelize(this.config);
    this.connection.addModels(this.config.modelPaths || []);
  };

}
