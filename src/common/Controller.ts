import Service from "./Service";
import { Request, Response } from "express-serve-static-core";
import ControllerReturns from "./ControllerReturns";

abstract class Controller extends ControllerReturns {

    abstract service: Service;

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    public get = async (req: Request, res: Response): Promise<any> => {
        const id = req.params.id;

        if (!id) {
            this.returnBadRequest(res, `ID de ${this.service.modelName} inválido!`);
        }

        const data = await this.service.get(id);
        this.returnData(res, data);
    };


    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    public index = async (req: Request, res: Response): Promise<any> => {
        const list = req.query.list;
        let data;

        if (list) {
            data = await this.service.list();
        } else {
            const options = await this.getPaginateOptions(req.query);
            data = await this.service.all(options);
        }

        this.returnData(res, data);
    };

    /**
     *
     * @param req
     * @param res
     * @return {Promise<void>}
     */
    public store = async (req: any, res: any): Promise<any> => {
        try {
            const created = await this.service.create(req.body);
            if (created) {
                this.returnCreated(res, created, `${this.service.modelName} criado com sucesso!`);
            } else {
                this.returnBadRequest(res, `Erro durante criação de ${this.service.modelName}`);
            }
        } catch (err) {
            console.log(err);
            return this.processError(res, err);
        }
    };

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    public update = async (req: Request, res: Response): Promise<any> => {
        const id = req.params.id;

        if (!id) {
            this.returnNotFound(res, `ID de ${this.service.modelName} inválido!`);
        }

        try {
            const updated = await this.service.update(req.body, id);
            if (updated) {
                const model = await this.service.get(id);
                this.return(res, model, `${this.service.modelName} atualizado com sucesso!`);
            } else {
                this.returnServerError(res, `Erro durante a atualização de ${this.service.modelName}.`);
            }
        } catch (err) {
            console.log(err);
            return this.processError(res, err);
        }
    };

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    public delete = async (req: Request, res: Response): Promise<any> => {
        try {
            const id = req.params.id;

            if (!id) return this.returnNotFound(res, `ID de ${this.service.modelName} inválido!`);

            if (await this.service.delete(id)) {
                this.returnMessage(res, `${this.service.modelName} excluido com sucesso!`);
            } else {
                this.returnBadRequest(res, `Erro durante a exclusão de ${this.service.modelName}`);
            }
        } catch (err) {
            return this.processError(res, err);
        }
    };

    /**
     * @param query
     */
    public getPaginateOptions = async (query: any): Promise<any> => {
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