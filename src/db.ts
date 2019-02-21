
import { Sequelize } from "sequelize-typescript";
import { config } from "../dbconfig";

export const dbConnect = async () =>{
  const db = new Sequelize(config);
  db.addModels(config.modelPaths);
  return db;
}
