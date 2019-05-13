import { Sequelize, Error } from "sequelize";

import config from "../config/database";
import { getDirectories } from "./common/utils/functions";
import { resolve } from "path";
import { readdirSync } from "fs";

const env = process.env.NODE_ENV || "development";

export default class Database {
  public config: any = config[env];
  public sequelize: Sequelize;

  public constructor() {
    this.connect();
    this.verifyConnection();
    this.initModels();
  }

  public connect(): void {
    this.sequelize = new Sequelize(this.config);
  }

  public initModels(): void {
    const prefix = env == "development" ? "" : "build/";
    let modules = getDirectories(resolve(`${prefix}src/modules`));
    modules.forEach(
      (module): void => {
        const dir = `${prefix}src/modules/${module}`;
        readdirSync(resolve(dir)).forEach(
          async (filename): Promise<void> => {
            if (/.*.model/.test(filename)) {
              const model = await import(`./modules/${module}/${filename}`);
              model.init(this.sequelize);
            }
          }
        );
      }
    );
  }

  public verifyConnection(): void {
    this.sequelize
      .authenticate()
      .then(
        (): void => {
          console.log(
            `Connection successful on database: ${
              this.sequelize.config.database
            }`
          );
        }
      )
      .catch(
        (error: Error): void => {
          console.log(
            `Connection failed on database: ${
              this.sequelize.config.database
            }, ${error.message}`
          );
        }
      );
  }
}
