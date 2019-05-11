import { Sequelize } from "sequelize";
import chalk from "chalk";

import * as config from "./../config/database";

const env = process.env.NODE_ENV || "development";

export default class Database {
  public config: any = config[env];
  public sequelize: Sequelize;

  public constructor() {
    this.connect();
    this.verifyConnection();
  }

  public connect = (): void => {
    this.sequelize = new Sequelize(this.config);
  };

  public verifyConnection = (): void => {
    this.sequelize
      .authenticate()
      .then(
        (): void => {
          console.log(
            chalk.bgWhiteBright(
              chalk.green(
                `Connection successful on database: ${
                  this.sequelize.config.database
                }`
              )
            )
          );
        }
      )
      .catch(
        (error): void => {
          console.log(
            chalk.bgRed(
              chalk.black(
                `Connection failed on database: ${
                  this.sequelize.config.database
                }, ${error.message}`
              )
            )
          );
        }
      );
  };
}
