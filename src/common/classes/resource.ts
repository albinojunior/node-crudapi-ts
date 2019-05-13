import { Router } from "express";
import CrudController from "../controllers/crud";

export class Resource {
  /**
   * Create resource with defaults controller functions
   *
   * @param router
   * @param controller
   * @param except
   */
  public static create(
    router: Router,
    controller: CrudController,
    except: string[] = []
  ): Router {
    if (!except.includes("store")) router.post("/", controller.store);

    if (!except.includes("index")) router.get("/", controller.index);

    if (!except.includes("get")) router.get("/:id", controller.get);

    if (!except.includes("update")) router.put("/:id", controller.update);

    if (!except.includes("delete")) router.delete("/:id", controller.delete);

    return router;
  }
}
