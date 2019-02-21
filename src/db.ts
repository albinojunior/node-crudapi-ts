
import { Sequelize } from "sequelize-typescript";
import { config } from "../db.config";

export const dbConnect = async () =>{
  const db = new Sequelize(config);
  db.addModels(config.modelPaths);
  return db;
}
