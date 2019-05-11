require("dotenv").config();

import "reflect-metadata";
import * as http from "http";
import chalk from "chalk";

import App from './App';

const { APP_PORT } = process.env;

const server = http.createServer(App);
server.listen(APP_PORT);

server.on('listening', () => {
  console.log(chalk.bgGreen(chalk.whiteBright(`API has been started in port ${APP_PORT}!`)));
});

server.on('error', (error: NodeJS.ErrnoException) => {
  console.log(chalk.bgRed(chalk.whiteBright(error.message)));
});

