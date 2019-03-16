import { Sequelize } from "sequelize-typescript";
import chalk from "chalk";

const config = require("./config/database");
const env = process.env.NODE_ENV || 'development';

export default class Database {
  config: any = config[env];
  connection: Sequelize;

  constructor() {
    this.connect();
    this.verifyConnection();
  }

  connect = (): void => {
    this.connection = new Sequelize(this.config);
    this.connection.addModels(this.config.modelPaths || []);
  };

  verifyConnection = (): void => {
    this.connection.authenticate()
      .then(() => {
        console.log(chalk.bgWhiteBright(chalk.green(`Connection successful on database: ${this.connection.config.database}`)));
      })
      .catch((error) => {
        console.log(chalk.bgRed(chalk.black(`Connection failed on database: ${this.connection.config.database}, ${error.message}`)));
      });
  }

}
