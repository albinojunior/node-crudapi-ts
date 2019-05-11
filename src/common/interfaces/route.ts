import { Router } from "express";
import { HttpController } from "..";

export declare interface Route {
  router: Router;
  exceptRoutes?: string[];
  controller?: HttpController;
}
