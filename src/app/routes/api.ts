import { Router } from "express";

import { plural } from "pluralize";
import { getDirectories } from "../utils/functions.utils";
import { resolve } from "path";
import { existsSync } from "fs";

export class ApiRouter {
  router: Router = Router();
  exceptRoutes: string[] = ["auth"];

  constructor() {
    this.init();
  }

  init(): void {
    let modules = getDirectories(resolve("src/app/modules"));
    modules = modules.filter(module => this.exceptRoutes.indexOf(module) < 0);

    modules.forEach(module => {
      if (existsSync(resolve(`src/app/modules/${module}/${module}.router.ts`))) {
        this.router.use(`/${plural(module)}`, require(`../modules/${module}/${module}.router`).default)
      }
    });
  }

}

export default new ApiRouter().router;