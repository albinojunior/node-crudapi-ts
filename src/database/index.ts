
import { Sequelize } from "sequelize-typescript";
import { config } from "../config/db.config";

export const connect = async () =>{
  const db = new Sequelize(config);
  db.addModels(config.modelPaths);
  return db;
}
