import { Router } from "express";

import { name, version } from "../../../package.json";
import authMiddleware from "../middlewares/auth.middleware";

import ApiRouter from "./api";
import AuthRouter from "../modules/auth/auth.router";

export class IndexRouter {
  router: Router = Router();

  constructor() {
    this.init();
  }

  init(): void {
    this.router.use('/api', ApiRouter);
    this.router.use('/auth', AuthRouter);

    this.router.all('/', (req: any, res: any) => {
      res.send(`${name} ${version}`);
    });
  }

}

export default IndexRouter;