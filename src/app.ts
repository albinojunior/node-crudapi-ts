
import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as http from "http";
import chalk from "chalk";
import { dbConnect } from "./db";
import dotenv from "dotenv";
import router from "./routes";

//load environment varibles
dotenv.config();

//start db connection
dbConnect().then(() => {

    //start express and http server
    const app = express();
    const server = http.createServer(app);

    //apply middlewares
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //cors config
    app.use(function (req: any, res: any, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    //load routes
    app.use('/', router);

    // run express application on port 4000
    server.listen(4000, () => {
        console.log(chalk.greenBright(`api has been started in port 4000!`));
    });

}).catch((e: any) => { console.log(e) });


