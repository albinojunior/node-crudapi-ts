import { Router } from "express";
import { Resource } from "./resource";
import CrudController from "../controllers/crud";

export abstract class CrudRoute {
  abstract router: Router;
  abstract controller: CrudController;
  public exceptRoutes?: string[] = [];
  public createResource?: boolean = true;

  public init(): void {
    if (this.createResource) {
      Resource.create(this.router, this.controller, this.exceptRoutes);
    }
  }
}
