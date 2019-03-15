import controller from "./auth.controller";
import { Router } from "express";
import { Routing } from "nodeapi-cruds-ts";

export class AuthRouter extends Routing {

  controller: any = controller;
  router: Router = Router();

  constructor() {
    super();
    this.init();
  }

  init(): void {
    this.router.post('/token', controller.authenticate);
    this.router.post('/forgot-password', controller.forgotPassword);
    this.router.post('/reset-password', controller.resetPassword);
  }

}

export default new AuthRouter().router;

