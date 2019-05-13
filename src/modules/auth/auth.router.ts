import controller from "./auth.controller";
import { Router } from "express";

export class AuthRouter {
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
