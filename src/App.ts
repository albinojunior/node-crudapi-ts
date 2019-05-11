import { Sequelize } from "sequelize";

import express from "express";
import cors from "cors";
import logger from "morgan";

import Database from "./database";
import Schedule from "./schedule";
import IndexRouter from "./routes";

class App {
  public express: express.Application;
  public sequelize: Sequelize;
  public schedule: Schedule;

  private database = (): void => {
    this.sequelize = new Database().sequelize;
  };

  private middleware = (): void => {
    this.express.use(logger("dev"));
    this.express.use(cors());
  };

  private routes = (): void => {
    this.express.use("/", new IndexRouter().router);
  };

  private jobs = (): void => {
    this.schedule = new Schedule();
    this.schedule.startJobs();
  };

  public constructor() {
    this.express = express();
    this.database();
    this.middleware();
    this.routes();
    this.jobs();
  }
}

export default new App().express;
