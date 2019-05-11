import { Router } from "express";

import { name, version } from "../package.json";

import auth from "./middlewares/auth";

import AuthRouter from "./modules/auth/auth.router";

import { resolve } from "path";
import { existsSync } from "fs";
import { plural } from "pluralize";
import { getDirectories } from "./common/utils/functions";
import { Route } from "./common/classes/route.interface.js";

export class IndexRouter implements Route {
  public router: Router = Router();
  public exceptModules: string[] = ["auth", "s3"];

  public constructor() {
    this.initRoutes();
  }

  public initRoutes = (): void => {
    this.initApi();

    this.router.use("/auth", AuthRouter);

    this.router.all(
      "/",
      (req, res): void => {
        res.send(`${name} ${version}`);
      }
    );
  };

  public initApi = (): void => {
    let modules = getDirectories(resolve("src/modules"));
    modules = modules.filter(
      (module): boolean => this.exceptModules.indexOf(module) < 0
    );

    modules.forEach(
      (module): void => {
        if (existsSync(resolve(`src/modules/${module}/${module}.router.ts`))) {
          this.router.use(
            `/api/${plural(module)}`,
            auth.verifyAuth,
            require(`./modules/${module}/${module}.router`).default
          );
        }
      }
    );
  };
}

export default IndexRouter;
