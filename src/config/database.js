require("dotenv").config();
const { resolve } = require("path");
const { DB_HOST, DB_NAME, DB_DRIVER, DB_USER, DB_PASSWORD, NODE_ENV } = process.env;
const env = NODE_ENV || "development";

const defaultConfig = {
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  dialect: DB_DRIVER,
  modelPaths: [resolve("dist/src/app/modules/**/*.model.js")]
};

const storageConfig = {
  migrationStorage: "json",
  migrationStoragePath: "./src/database/migration-metadata.json",
  seederStorage: "json",
  seederStoragePath: "./src/database/seeder-metadata.json"
};

const config = {
  [env]: { ...defaultConfig, ...storageConfig }
};

module.exports = config;

