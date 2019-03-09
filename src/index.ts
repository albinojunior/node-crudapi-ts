require("dotenv").config(); //load enviroment

import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as http from "http";
import chalk from "chalk";
import { connect } from "./database";
import router from "./app/routes";

const startServer = async () => {
  await connect();

  const app = express();
  const server = http.createServer(app);

  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(function (req: any, res: any, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/', router);

  const port = process.env.APP_PORT || 3000;
  server.listen(port, () => {
    console.log(chalk.greenBright(`API has been started in port ${port}!`));
  });

};

startServer()
  .then(() => {
    console.log(chalk.bgGreen(chalk.whiteBright("API RUNNING...")));
  })
  .catch((error) => {
    console.log(chalk.redBright(error));
  });
