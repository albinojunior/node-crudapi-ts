import { Router } from "./node_modules/express";
import { HttpController } from "../controllers/http";

export declare interface Route {
  router: Router;
  exceptRoutes?: string[];
  controller?: HttpController;
}
