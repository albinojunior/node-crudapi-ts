require("dotenv").config();
const { resolve } = require("path");
const { DB_HOST, DB_NAME, DB_DRIVER, DB_USER, DB_PASSWORD, NODE_ENV } = process.env;
const env = NODE_ENV || "development";

const modelPath = env == "development" ? "src/modules/**/*.model.ts" : "build/src/modules/**/*.model.js";

const defaultConfig = {
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  dialect: DB_DRIVER,
  modelPaths: [resolve(modelPath)],
  dialectOptions: {
    dateStrings: true,
    typeCast: (field, next) => {
      if (field.type === 'DATETIME') return field.string();
      return next();
    }
  },
  timezone: "-03:00"
};

const storageConfig = {
  migrationStorage: "json",
  migrationStoragePath: "./database/migration-metadata.json",
  seederStorage: "json",
  seederStoragePath: "./database/seeder-metadata.json"
};

const config = {
  [env]: { ...defaultConfig, ...storageConfig }
};

module.exports = config;

