import UserRouter from "../modules/user/user.router";
import { Router } from "express";

export class ApiRouter {
  router: Router = Router();

  constructor() {
    this.init();
  }

  init(): void {
    this.router.use('/users', UserRouter);
  }

}

export default new ApiRouter().router;