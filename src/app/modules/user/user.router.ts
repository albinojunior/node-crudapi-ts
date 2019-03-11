import controller from "./user.controller";
import Resource from "../../common/Resource";
import Controller from "../../common/Controller";
import { Router } from "express";

export class UserRouter {
  router: Router = Router();
  controller: Controller = controller;

  constructor() {
    this.init();
  }

  init(): void {
    this.router = Resource.create(this.router, this.controller);
  }

}

export default new UserRouter().router;