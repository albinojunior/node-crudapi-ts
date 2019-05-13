import { Sequelize } from "sequelize";

import express = require("express");
import cors = require("cors");
import logger = require("morgan");

import Database from "./database";
import { IndexRoute } from "./routes";

class App {
  public express: express.Application;
  public sequelize: Sequelize;

  /* uncomment this line to instance and enable jobs */
  // public schedule: Schedule;

  public constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();

    /* uncomment this call to enable jobs */
    /* if (!process.env.DISABLE_SCHEDULE) this.jobs(); */
  }

  private database(): void {
    this.sequelize = new Database().sequelize;
  }

  private middlewares(): void {
    this.express.use(logger("dev"));
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use("/", new IndexRoute().router);
  }

  /* uncomment this method to enable jobs */
  /*
    private jobs = (): void => {
      this.schedule = new Schedule();
      this.schedule.startJobs();
    };
  */
}
export default new App().express;
