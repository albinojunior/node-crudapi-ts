import { Sequelize } from "sequelize-typescript";
import { config } from "../config/db.config";
import { applyHooks } from "./global.hooks";

export const connect = async () => {
  const db = new Sequelize(config);
  db.addModels(config.modelPaths);
  await applyHooks(db);
  return db;
};
