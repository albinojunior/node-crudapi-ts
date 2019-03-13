import controller from "./user.controller";
import { Controller, Routing } from "nodeapi-cruds";
import { Router } from "express";

export class UserRouter extends Routing {
  router: Router = Router();
  controller: Controller = controller;
  exceptRoutes: string[] = [];

  constructor() {
    super();
    this.createResource();
  }

}

export default new UserRouter().router;