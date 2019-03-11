import { ISequelizeConfig, Sequelize } from "sequelize-typescript";
import config from "./config/db";

export default class Database {
  config: ISequelizeConfig = config;
  connection: Sequelize;

  constructor() {
    this.connect();
  }

  connect = (): void => {
    this.connection = new Sequelize(this.config);
    this.connection.addModels(this.config.modelPaths || []);
  };

}
