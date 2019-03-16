import { Sequelize } from "sequelize-typescript";
import chalk from "chalk";

import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import Database from "./Database";
import IndexRouter from "./app/routes/index";

class App {
  express: express.Application;
  connection: Sequelize;

  private middleware = (): void => {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  };

  private routes = (): void => {
    this.express.use('/', new IndexRouter().router);
  };

  private database = (): void => {
    this.connection = new Database().connection;
  };

  constructor() {
    this.express = express();
    this.database();
    this.middleware();
    this.routes();
  }

}

export default new App().express;