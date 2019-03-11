import { ISequelizeConfig } from "sequelize-typescript";
import { resolve } from "path";

const { DB_HOST, DB_NAME, DB_DRIVER, DB_USER, DB_PASSWORD } = process.env;

const config: ISequelizeConfig = {
  host: DB_HOST,
  database: DB_NAME || "db_name",
  dialect: DB_DRIVER || "mysql",
  username: DB_USER || "root",
  password: DB_PASSWORD || "root",
  storage: ':memory:',
  modelPaths: [resolve("dist/src/app/modules/**/*.model.js")]
};

export default config;
