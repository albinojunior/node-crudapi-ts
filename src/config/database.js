require("dotenv").config();
const { resolve } = require("path");
const { DB_HOST, DB_NAME, DB_DRIVER, DB_USER, DB_PASSWORD, NODE_ENV } = process.env;
const env = NODE_ENV || "development";

const defaultConfig = {
  url: `${DB_DRIVER}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  modelPaths: [resolve("./dist/src/app/modules/**/*.model.js")]
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

