import { Router } from "express";

import { plural } from "pluralize";
import { getDirectories } from "nodeapi-cruds-ts";
import { resolve } from "path";
import { existsSync } from "fs";
import { Routing } from "nodeapi-cruds-ts";

export class ApiRouter extends Routing {
  router: Router = Router();
  exceptModules: string[] = ["auth"];

  constructor() {
    super();
    this.init();
  }

  init(): void {
    let modules = getDirectories(resolve("src/app/modules"));
    modules = modules.filter(module => this.exceptModules.indexOf(module) < 0);

    modules.forEach(module => {
      if (existsSync(resolve(`src/app/modules/${module}/${module}.router.ts`))) {
        this.router.use(`/${plural(module)}`, require(`../modules/${module}/${module}.router`).default)
      }
    });
  }

}

export default new ApiRouter().router;