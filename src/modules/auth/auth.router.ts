import controller from "./auth.controller";
import { Router } from "express";
import { Route } from "../../common/classes/route.interface";

export class AuthRouter implements Route {
  public controller = controller;
  public router: Router = Router();

  public constructor() {
    this.init();
  }

  public init(): void {
    this.router.post("/token", controller.authenticate);
    this.router.post("/forgot-password", controller.forgotPassword);
    this.router.post("/reset-password", controller.resetPassword);
  }
}

export default new AuthRouter().router;
