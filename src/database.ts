import { Sequelize, Error } from "sequelize";

import config = require("../config/database");
import { getDirectories } from "./common/utils/functions";
import { resolve } from "path";
import { readdirSync } from "fs";

const env = process.env.NODE_ENV || "development";
const prefix = env == "development" ? "" : "build/";

export default class Database {
  public config: any = config[env];
  public sequelize: Sequelize;
  public modules: any[] = getDirectories(resolve(`${prefix}src/modules`));

  public constructor() {
    this.connect();
    this.verifyConnection();
    this.initModels();
  }

  public connect(): void {
    this.sequelize = new Sequelize(this.config);
  }

  public initModels(): void {
    try {
      //init modules
      this.modules.forEach(
        (module): void => {
          const dir = `${prefix}src/modules/${module}`;
          readdirSync(resolve(dir)).forEach(
            (filename): void => {
              if (/.*.model/.test(filename)) {
                const model = require(`./modules/${module}/${filename}`);
                model.init(this.sequelize);
              }
            }
          );
        }
      );
      this.initModelsRelation();
    } catch (err) {
      console.log("models init error:", err);
    }
  }

  public initModelsRelation(): void {
    try {
      //init relations
      this.modules.forEach(
        (module): void => {
          const dir = `${prefix}src/modules/${module}`;
          readdirSync(resolve(dir)).forEach(
            async (filename): Promise<void> => {
              if (/.*.model/.test(filename)) {
                const model = require(`./modules/${module}/${filename}`);
                if (model.hasOwnProperty("associate"))
                  await model.associate(model.default, this.sequelize);
              }
            }
          );
        }
      );
    } catch (err) {
      console.log("init relations error:", err);
    }
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
