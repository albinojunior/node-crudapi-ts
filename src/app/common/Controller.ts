import Service from "./Service";
import { Request, Response } from "express-serve-static-core";
import ControllerReturns from "./ControllerReturns";

abstract class Controller extends ControllerReturns {

  abstract service: Service;

  /**
   * get method
   *
   * @param req
   * @param res
   */
  get = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    if (!id) return this.returnBadRequest(res, `ID de ${this.service.modelName} inválido!`);

    return this.returnData(res, await this.service.get(id));
  };

  /**
   * list all method
   *
   * @param req
   * @param res
   */
  index = async (req: Request, res: Response): Promise<any> => {
    const list = req.query.list;

    if (list) return this.returnData(res, await this.service.list());

    const options = await this.buildOptions(req.query);

    return this.returnData(res, await this.service.all(options));
  };

  /**
   * store method
   *
   * @param req
   * @param res
   */
  store = async (req: any, res: any): Promise<any> => {
    try {
      const created = await this.service.create(req.body);
      if (created) return this.returnCreated(res, created, `${this.service.modelName} criado com sucesso!`);

      return this.returnBadRequest(res, `Erro durante criação de ${this.service.modelName}`);
    } catch (err) {
      console.log(err);
      return this.processError(res, err);
    }
  };

  /**
   * update method
   *
   * @param req
   * @param res
   */
  update = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    if (!id) return this.returnNotFound(res, `ID de ${this.service.modelName} inválido!`);

    try {
      if (await this.service.update(req.body, id))
        return this.return(res, await this.service.get(id), `${this.service.modelName} atualizado com sucesso!`);

      return this.returnServerError(res, `Erro durante a atualização de ${this.service.modelName}.`);
    } catch (err) {
      return this.processError(res, err);
    }
  };

  /**
   * delete method
   *
   * @param req
   * @param res
   */
  delete = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    if (!id) return this.returnNotFound(res, `ID de ${this.service.modelName} inválido!`);

    try {
      if (await this.service.delete(id))
        return this.returnMessage(res, `${this.service.modelName} excluído com sucesso!`);

      return this.returnBadRequest(res, `Erro durante a exclusão de ${this.service.modelName}`);
    } catch (err) {
      return await this.processError(res, err);
    }
  };

  /**
   *
   * @param query
   */
  buildOptions = async (query: any): Promise<any> => {
    return {
      limit: query.hasOwnProperty('limit') && query.limit ? query.limit : 15,
      search: query.hasOwnProperty('search') && query.search ? query.search : "",
      page: query.hasOwnProperty('page') && query.page ? query.page : 1,
      order: query.hasOwnProperty('order') && query.order ? query.order : "ASC",
      sort: query.hasOwnProperty('sort') && query.sort ? query.sort : "id",
      query
    }
  }
}

export default Controller;