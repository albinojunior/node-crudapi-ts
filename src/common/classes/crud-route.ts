import { HttpController } from "..";
import { Router } from "express";
import { Resource } from "./resource";

export abstract class CrudRoute {
  abstract router: Router;
  abstract controller: HttpController;
  public exceptRoutes?: string[];
  public createResource?: boolean = true;

  public init(): void {
    if (this.createResource) {
      Resource.create(this.router, this.controller, this.exceptRoutes);
    }
  }
}
