import { CrudRoute } from "./../../common/classes/crud-route";
import controller from "./user.controller";
import { Router } from "express";

export class UserRoute extends CrudRoute {
  public router: Router = Router();
  public controller = controller;

  public constructor() {
    super();
    this.init();
  }
}

export default new UserRoute().router;
