import { Sequelize } from "sequelize";

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');

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
    this.express.enable('trust proxy');
    // Set Body parser, reading data from body into req.body
    this.express.use(express.json({ limit: '10kb' }));
    this.express.use(express.urlencoded({ extended: true, limit: '10kb' }));
    // Set Cookie parser
    this.express.use(cookieParser());
    // Set security HTTP headers
    this.express.use(helmet());
    //Limit requests from the same API
    const limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      messege: 'Too many requests from this IP, Please try again in an hour!'
    });
    this.express.use('/', limiter);
    //Data sanitization against XSS
    this.express.use(xss());
    // Prevent http param pollution
    this.express.use(hpp());
    // Implement CORS
    this.express.use(cors());
    this.express.options('*', cors());
    this.express.use(compression());
    this.express.disable('x-powered-by');
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
